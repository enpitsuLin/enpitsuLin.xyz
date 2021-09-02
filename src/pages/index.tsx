import * as React from 'react';
import { Link, graphql, PageRendererProps, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout/';
import Seo from '../components/seo';

type Props = PageRendererProps;

const BlogIndex: React.FC<Props> = ({ location }) => {
  const data = useStaticQuery<GatsbyTypes.Query>(graphql`
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
  const posts = edges.map(edge => edge.node.childMarkdownRemark) as GatsbyTypes.MarkdownRemark[];

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <Seo title="首页" />
        <p className="no-article">暂时好像还没有文章呢。</p>
      </Layout>
    );
  }

  return (
    <Layout location={location}>
      <Seo title="首页" />

      {posts.map((post, index) => {
        const title = post.frontmatter?.title || post.fields?.slug || '无标题';
        return (
          <article key={index} className="post" itemScope itemType="http://schema.org/Article">
            <header>
              <h2 className="post-title">
                <Link to={`/post${post.fields?.slug}` || '/404'} itemProp="url">
                  <span itemProp="title">{title}</span>
                </Link>
              </h2>
              <div className="post-meta">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>{post.frontmatter?.date || '未知时间'}</span>
              </div>
            </header>
            <div className="post-content">
              <p
                dangerouslySetInnerHTML={{
                  __html: (post.frontmatter?.description || post.excerpt) as string
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
