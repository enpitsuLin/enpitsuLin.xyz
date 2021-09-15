import React, { FunctionComponent } from 'react';
import Pagination from '@/components/Pagination';
import { navigateToArticle } from '@/utils/article';
import { Flex } from '@chakra-ui/layout';
import ArticleItem from './ListItem';

interface Props {
  articles: GatsbyTypes.MarkdownRemark[];
  pageCount: number;
  pageIndex: number;
}

const ArticleItemList: FunctionComponent<Props> = ({ articles, pageCount, pageIndex }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <ArticleItem key={index} article={article}></ArticleItem>
      ))}
      <Flex justifyContent="center">
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex + 1}
          onChange={toPage => {
            navigateToArticle(toPage === 1 ? '' : `/${toPage}`);
          }}
        />
      </Flex>
    </div>
  );
};

export default ArticleItemList;
