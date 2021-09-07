import React from 'react';
import { graphql, Link, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';
import ArticleHeader from '@/components/Article/ArticleHeader';
import AnimatedContent from '@/components/AnimatedContent';
import ArticleToc from '@/components/Article/ArticleToc';

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
  const headings = (article.headings as GatsbyTypes.MarkdownHeading[]) || [];

  return (
    <BasicLayout location={location}>
      <Seo
        title={article.frontmatter?.title as string}
        description={article.frontmatter?.description || article.excerpt}
      />
      <ArticleHeader article={article} />
      <AnimatedContent>
        <article className="article-content" itemScope itemType="http://schema.org/Article">
          <div className="max-w-7xl mx-auto p-4 relative flex flex-row">
            <div className="w-3/4">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.html as string }}
                itemProp="articleBody"
              />
            </div>
            <ArticleToc
              headings={headings}
              onTocClick={id => {
                console.log(id);
              }}
            />
          </div>

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
      </AnimatedContent>
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
      headings {
        value
        depth
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
