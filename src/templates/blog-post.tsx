import React from 'react';
import { Link, graphql, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';

interface Props extends PageRendererProps {
  pageContext?: {};
  [key: string]: any;
}

const BlogPostTemplate: React.FC<Props> = ({ data, location }) => {
  const post = data.markdownRemark;
  const { previous, next } = data;
  const {
    timeToRead,
    wordCount: { words }
  } = post;
  const nonLatinCount: number = post.html.match(/[\p{sc=Katakana}\p{sc=Hiragana}\p{sc=Han}]/gu).length;
  const wordCount = nonLatinCount + words;

  return (
    <BasicLayout location={location}>
      <Seo title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <article className="post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 className="post-title" itemProp="headline">
            {post.frontmatter.title}
          </h1>
        </header>
        <div className="post-meta">
          <div title="发表时间" className="post-time">
            <i className="icon-calendar" aria-hidden="true"></i>
            {post.frontmatter?.date || '未知时间'}
          </div>
          {post.frontmatter?.tags && (
            <div className="post-tags">
              <i className="fa fa-folder-open"></i>
              {post.frontmatter?.tags.map((tag, index) => {
                return (
                  <Link key={index} to="/" className="tag">
                    {tag}
                  </Link>
                );
              })}
            </div>
          )}
          <div className="post-time-to-read" title="阅读时间">
            <i className="fa fa-file"></i>
            阅读需要{Math.floor(timeToRead + wordCount / 500)}分钟
          </div>
          <div className="word-count" title="字数统计">
            <i className="fa fa-clock-o"></i>
            {wordCount} 字
          </div>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <nav className="post-nav">
          {previous && (
            <Link to={`/post${previous.fields.slug}`} rel="prev">
              {previous.frontmatter.title}
            </Link>
          )}

          {next && (
            <Link to={`/post${next.fields.slug}`} rel="next">
              {next.frontmatter.title}
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
