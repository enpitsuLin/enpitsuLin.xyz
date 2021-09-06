import React from 'react';
import { graphql, Link, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';

interface Props extends PageRendererProps {
  pageContext?: {};
  data: {
    markdownRemark: GatsbyTypes.MarkdownRemark;
    previous: GatsbyTypes.MarkdownRemark;
    next: GatsbyTypes.MarkdownRemark;
  };
}

const BlogPostTemplate: React.FC<Props> = ({ data, location }) => {
  const article = data.markdownRemark;
  const { previous, next } = data;

  return (
    <BasicLayout location={location}>
      <Seo
        title={article.frontmatter?.title as string}
        description={article.frontmatter?.description || article.excerpt}
      />
      <div className="h-64 dark:bg-skobeloff flex justify-center items-center">
        <div>
          <p className="text-3xl"> {article.frontmatter?.title || '无标题'}</p>
        </div>
      </div>
      <article className="article-content page-container" itemScope itemType="http://schema.org/Article">
        <div
          className="article-content pt-3"
          dangerouslySetInnerHTML={{ __html: article.html as string }}
          itemProp="articleBody"
        />
        <nav className="article-nav">
          {previous && (
            <Link to={`/article${previous.fields?.slug}`} rel="prev">
              {previous.frontmatter?.title}
            </Link>
          )}

          {next && (
            <Link to={`/article${next.fields?.slug}`} rel="next">
              {next.frontmatter?.title}
            </Link>
          )}
        </nav>
      </article>
    </BasicLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY 年 MM月 DD日 ")
        description
        tags
      }
      timeToRead
      wordCount {
        words
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
