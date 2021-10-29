import React, { useCallback, useRef, useEffect, useState } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { Container, Flex, Box, Button } from '@chakra-ui/react';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';
import ArticleHeader from '@/components/Article/ArticleHeader';
import AnimatedContent from '@/components/AnimatedContent';
import ArticleToc from '@/components/Article/ArticleToc';
import useScroll from '@/hooks/useScroll';
import ArticleContent from '@/components/Article/ArticleContent';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { navigateToArticle } from '@/utils/article';
import ArticleComment from '@/components/Article/ArticleComment';
import ArticleNav from '@/components/Article/ArticleNav';

const __MAIN_HEADER_HEIGHT__ = 66;

interface Props extends PageRendererProps {
  pageContext?: {};
  data: {
    markdownRemark: GatsbyTypes.MarkdownRemark;
    previous: GatsbyTypes.MarkdownRemark;
    next: GatsbyTypes.MarkdownRemark;
  };
}
function isWindowBetween(element: HTMLElement | null): boolean {
  const isBetween = !!element && element.getBoundingClientRect().top - __MAIN_HEADER_HEIGHT__ >= 1;
  return isBetween;
}

const BlogPostTemplate: React.FC<Props> = ({ data, location }) => {
  const scroll = useScroll();
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeHeading, setActiveHeading] = useState('');

  const article = data.markdownRemark;
  const headings = (article.headings as GatsbyTypes.MarkdownHeading[]) || [];
  const { previous, next } = data;

  useEffect(() => {
    for (let i = 0; i < headings.length - 1; i++) {
      if (isWindowBetween(document.getElementById(headings[i + 1].id as string))) {
        setActiveHeading(headings[i].id as string);
        return;
      } else {
        setActiveHeading(headings[headings.length - 1].id as string);
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
          <Container maxW="container.xl">
            <Flex>
              <Box w={['full', 'full', '75%', '75%']}>
                <ArticleContent article={article} ref={articleRef} />
                {!article.frontmatter?.ignore_in_list && <ArticleNav previous={previous} next={next} />}
              </Box>
              <Box w="25%" display={{ base: 'none', md: 'block' }}>
                <ArticleToc
                  headings={headings}
                  active={activeHeading}
                  onTocClick={id => {
                    scrollToHeading(id);
                  }}
                />
              </Box>
            </Flex>
            <ArticleComment article={article} />
          </Container>
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
      fields {
        slug
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
