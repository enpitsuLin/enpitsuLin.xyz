import * as React from 'react';
import { Link, graphql, PageRendererProps, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout/';
import Seo from '../components/seo';

type Props = PageRendererProps;

const BlogIndex: React.FC<Props> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "posts" }, extension: { eq: "md" } }
        sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            childMarkdownRemark {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date(formatString: "YYYY 年 MM月 DD日 ")
                title
                description
              }
            }
          }
        }
      }
    }
  `);
  const edges = data.allFile.edges;
  const posts = edges.map(edge => edge.node.childMarkdownRemark);

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the
          "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <Seo title="All posts" />

      {posts.map((post, index) => {
        const title = post.frontmatter.title || post.fields.slug;
        return (
          <article key={index} className="post" itemScope itemType="http://schema.org/Article">
            <header>
              <h2 className="post-title">
                <Link to={`/post${post.fields.slug}`} itemProp="url">
                  <span itemProp="title">{title}</span>
                </Link>
              </h2>
              <div className="post-meta">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>{post.frontmatter.date}</span>
              </div>
            </header>
            <div className="post-content">
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt
                }}
                itemProp="description"
              />
            </div>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;
