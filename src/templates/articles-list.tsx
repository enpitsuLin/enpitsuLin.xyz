import React, { FunctionComponent } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';
import AnimatedContent from '@/components/AnimatedContent';
import ArticleItemList from '@/components/Article/ArticleItemList';

import { Container, Flex, Box } from '@chakra-ui/react';

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
            <Box md={8}>
              <ArticleItemList articles={articles} pageCount={pageCount} pageIndex={pageIndex} />
            </Box>
            <Box md={4} className="d-none d-md-block">
              <div></div>
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
      filter: { id: { in: $ids } }
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
