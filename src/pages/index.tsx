import React from 'react';
import { Link, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';
import useAllPosts from '@/hooks/useAllPosts';

type Props = PageRendererProps;

const BlogIndex: React.FC<Props> = ({ location }) => {
  const posts = useAllPosts();

  if (posts.length === 0) {
    return (
      <BasicLayout location={location}>
        <Seo title="首页" />
        <p className="no-article">暂时好像还没有文章呢。</p>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout location={location}>
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
                <span title="发表时间" className="post-time">
                  <i className="icon-calendar" aria-hidden="true"></i>
                  {post.frontmatter?.date || '未知时间'}
                </span>
              </div>
            </header>
            <div className="post-content">
              <p
                dangerouslySetInnerHTML={{
                  __html: (post.frontmatter?.description || post.excerpt) as string
                }}
                itemProp="description"
              />
              <div className="read-more">
                <Link to={post.fields?.slug ? `/post${post.fields?.slug}` : '/404'} itemProp="url">
                  <span itemProp="title">阅读全文</span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </BasicLayout>
  );
};

export default BlogIndex;
