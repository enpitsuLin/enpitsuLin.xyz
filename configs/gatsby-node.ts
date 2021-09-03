/* eslint-disable @typescript-eslint/no-use-before-define */
import path from 'path';
import { CreatePagesArgs, SourceNodesArgs, CreateSchemaCustomizationArgs, Node } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

interface ArticlesQueryResult {
  allMarkdownRemark: {
    nodes: { id: string; fields: { slug: string } }[];
  };
}

export const createPage = async ({ graphql, actions, reporter }: CreatePagesArgs) => {
  const { createPage } = actions;

  const result = await graphql<ArticlesQueryResult>(`
    query pageQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }
  const posts = result.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: `post${post.fields.slug}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId
        }
      });
    });
  }
};

export const onCreateNode = ({ node, actions, getNode }: SourceNodesArgs) => {
  const { createNodeField } = actions;

  if ((node as Node).internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node: node as Node, getNode });

    createNodeField({
      name: `slug`,
      node: node as Node,
      value
    });
  }
};

export const createSchemaCustomization = ({ actions }: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};
