import React, { FunctionComponent } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/components/BasicLayout';
import Seo from '@/components/seo';
import AnimatedContent from '@/components/AnimatedContent';
import ArticleItemList from '@/components/Article/ArticleItemList';
import { Container, Flex, Box } from '@chakra-ui/react';
import { navigateToArticle } from '@/utils/article';
import SearchCard from '@/components/Card/SearchCard';
import TagsCard from '@/components/Card/TagsCard';
import Affix from '@/components/Affix';

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection;
  };
  pageContext: {
    pageCount: number;
    pageIndex: number;
  };
}

const BlogPostTemplate: FunctionComponent<Props> = ({ data, location, pageContext }) => {
  const articles = data.allMarkdownRemark.nodes as GatsbyTypes.MarkdownRemark[];
  const { pageCount, pageIndex } = pageContext;

  return (
    <BasicLayout location={location}>
      <Seo title="文章" />
      <AnimatedContent>
        <Container maxW="container.xl">
          <Flex>
            <Box w={{ base: 'full', lg: '66%' }} pt={4}>
              <Box display={{ base: 'full', lg: 'none' }}>
                <SearchCard />
              </Box>
              <ArticleItemList
                articles={articles}
                pageCount={pageCount}
                pageIndex={pageIndex}
                pageChange={pageNum => {
                  navigateToArticle(pageNum === 1 ? '' : `/${pageNum}`);
                }}
              />
            </Box>
            <Box w="33%" display={{ base: 'none', lg: 'block' }} pl={8}>
              <Affix offsetTop="calc(4.75rem + 4px)">
                <SearchCard />
                <TagsCard />
              </Affix>
            </Box>
          </Flex>
        </Container>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query articlesByIds($ids: [String], $limit: Int) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { id: { in: $ids }, frontmatter: { ignore_in_list: { ne: true } } }
      limit: $limit
    ) {
      nodes {
        id
        excerpt(format: HTML, truncate: true)
        html
        frontmatter {
          title
          date(formatString: "YYYY 年 MM月 DD日 ")
          description
          tags
        }
        fields {
          slug
        }
        timeToRead
        wordCount {
          words
        }
      }
      pageInfo {
        totalCount
        currentPage
        totalCount
        perPage
      }
    }
  }
`;
