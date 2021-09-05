import React from 'react';
import { Link, graphql, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';
import { calcArticleWordCount } from '@/utils/article';
interface Props extends PageRendererProps {
  pageContext?: {};
  data: {
    markdownRemark: GatsbyTypes.MarkdownRemark;
    previous: GatsbyTypes.MarkdownRemark;
    next: GatsbyTypes.MarkdownRemark;
  };
}

const BlogPostTemplate: React.FC<Props> = ({ data, location }) => {
  const post = data.markdownRemark;
  const { previous, next } = data;
  const timeToRead = post.timeToRead || 0;
  const wordCount = calcArticleWordCount(post);

  return (
    <BasicLayout location={location}>
      <Seo title={post.frontmatter?.title as string} description={post.frontmatter?.description || post.excerpt} />
      <article className="post" itemScope itemType="http://schema.org/Article">
        <div className="text-4xl font-medium text-gray-800 pb-5" itemProp="headline">
          {post.frontmatter?.title}
        </div>
        <div className="flex">
          <div title="发表时间" className="mr-2">
            <i className="fa fa-calendar mr-1" aria-hidden="true"></i>
            {post.frontmatter?.date || '未知时间'}
          </div>
          {post.frontmatter?.tags && (
            <div className="mr-2">
              <i className="fa fa-folder-open mr-1"></i>
              {post.frontmatter?.tags.map((tag, index) => {
                return (
                  <Link key={index} to="/" className="tag">
                    {tag}
                  </Link>
                );
              })}
            </div>
          )}
          <div title="阅读时间" className="mr-2">
            <i className="fa fa-file mr-1"></i>
            阅读需要{Math.floor(timeToRead + wordCount / 500)}分钟
          </div>
          <div title="字数统计" className="mr-2">
            <i className="fa fa-clock-o mr-1"></i>
            {wordCount} 字
          </div>
        </div>
        <div
          className="post-content pt-3"
          dangerouslySetInnerHTML={{ __html: post.html as string }}
          itemProp="articleBody"
        />
        <nav className="post-nav">
          {previous && (
            <Link to={`/post${previous.fields?.slug}`} rel="prev">
              {previous.frontmatter?.title}
            </Link>
          )}

          {next && (
            <Link to={`/post${next.fields?.slug}`} rel="next">
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
