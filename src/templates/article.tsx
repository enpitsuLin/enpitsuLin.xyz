import React, { useCallback, useRef, useEffect, useState } from 'react';
import { graphql, Link, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';
import ArticleHeader from '@/components/Article/ArticleHeader';
import AnimatedContent from '@/components/AnimatedContent';
import ArticleToc from '@/components/Article/ArticleToc';
import useScroll from '@/hooks/useScroll';
import ArticleContent from '@/components/Article/ArticleContent';

const __MAIN_HEADER_HEIGHT__ = 54.5;

interface Props extends PageRendererProps {
  pageContext?: {};
  data: {
    markdownRemark: GatsbyTypes.MarkdownRemark;
    previous: GatsbyTypes.MarkdownRemark;
    next: GatsbyTypes.MarkdownRemark;
  };
}
function isWindowBetween(element: HTMLElement | null): boolean {
  return !!element && element.getBoundingClientRect().top - __MAIN_HEADER_HEIGHT__ >= 2;
}

const BlogPostTemplate: React.FC<Props> = ({ data, location }) => {
  const scroll = useScroll();
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeHeading, setActiveHeading] = useState('');

  const article = data.markdownRemark;
  const { previous, next } = data;
  const headings = (article.headings as GatsbyTypes.MarkdownHeading[]) || [];

  useEffect(() => {
    for (let i = 0; i < headings.length - 1; i++) {
      if (isWindowBetween(document.getElementById(headings[i + 1].id as string))) {
        setActiveHeading(headings[i + 1].id as string);
        return;
      }
    }
  }, [scroll]);

  const scrollToHeading = useCallback((id: string) => {
    const el = articleRef.current?.querySelector(`#${id}`);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - __MAIN_HEADER_HEIGHT__,
      behavior: 'smooth'
    });
  }, []);

  return (
    <BasicLayout location={location}>
      <Seo
        title={article.frontmatter?.title as string}
        description={article.frontmatter?.description || article.excerpt}
      />
      <ArticleHeader article={article} />
      <AnimatedContent>
        <article className="article-content" itemScope itemType="http://schema.org/Article">
          <div className="max-w-7xl mx-auto p-4 flex relative flex-row">
            <ArticleContent article={article} ref={articleRef} />
            <ArticleToc
              headings={headings}
              active={activeHeading}
              onTocClick={id => {
                scrollToHeading(id);
              }}
            />
          </div>
          <div className="h-96"></div>
          <nav className="article-nav h-96">
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
        id
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
