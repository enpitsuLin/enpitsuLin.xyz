import React, { FunctionComponent } from 'react';
import { BasicLayout } from '@/layouts';
import { PageRendererProps } from 'gatsby';
import { parseQuery } from '@/utils/location';
import useAllArticles from '@/hooks/useAllArticles';
import Seo from '@/components/seo';
import AnimatedContent from '@/components/AnimatedContent';
import ArticleItemList from '@/components/Article/ArticleItemList';
import { Container, Flex, Box, Input, InputRightAddon, InputGroup, Text } from '@chakra-ui/react';
import Card from '@/components/Card';
import { FaSearch } from 'react-icons/fa';
import { navigateToSearchPage } from '@/utils/article';

interface Query {
  query?: string;
  page?: number;
}

const pageSize = 5;

interface Props extends PageRendererProps {}
const SearchPage: FunctionComponent<Props> = ({ location }) => {
  const { query, page = 1 } = parseQuery(location.search) as Query;
  const allArticles = useAllArticles();
  let searchResult = allArticles;
  if (query) {
    searchResult = allArticles.filter(article => {
      // query keyword in title
      if (article.frontmatter?.title?.toUpperCase().includes(query.toUpperCase())) {
        return true;
      }
      // query keyword in tags
      if (article.frontmatter?.tags?.includes(query)) {
        return true;
      }
      return false;
    });
  }
  const pageCount = Math.ceil(searchResult.length / pageSize);
  searchResult = searchResult.slice((page - 1) * pageSize, page * pageSize);

  return (
    <BasicLayout location={location}>
      <Seo title={`${query} 搜索结果`} />
      <AnimatedContent>
        <Container maxW="container.xl">
          <Flex>
            <Box w={{ base: 'full', md: '66%' }}>
              <Box mb={8}>
                <Text fontSize="4xl">{query} 搜索结果</Text>
                <Text fontSize="sm"> 结果数：0</Text>
              </Box>
              <ArticleItemList
                articles={searchResult}
                pageCount={pageCount}
                pageIndex={page - 1}
                pageChange={pageNum => {
                  const queryEncoded = encodeURIComponent(query || '');
                  navigateToSearchPage(queryEncoded, pageNum);
                }}
              />
            </Box>
            <Box w="33%" display={{ base: 'none', md: 'block' }} pl={8}>
              <Card hover={false}>
                <InputGroup>
                  <Input
                    variant="outline"
                    placeholder="搜索"
                    _placeholder={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)' }}
                  />
                  <InputRightAddon children={<FaSearch color="gray.300" />} cursor="pointer" />
                </InputGroup>
              </Card>
            </Box>
          </Flex>
        </Container>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default SearchPage;
