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
          <span title="发表时间" className="post-time">
            <i className="icon-calendar" aria-hidden="true"></i>
            {post.frontmatter?.date || '未知时间'}
          </span>
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
