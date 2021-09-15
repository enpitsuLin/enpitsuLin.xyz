import React, { FunctionComponent } from 'react';
import Pagination from '@/components/Pagination';
import { Flex } from '@chakra-ui/layout';
import ArticleItem from './ListItem';

interface Props {
  articles: GatsbyTypes.MarkdownRemark[];
  pageCount: number;
  pageIndex: number;
  pageChange: (pageNum: number) => void;
}

const ArticleItemList: FunctionComponent<Props> = ({ articles, pageCount, pageIndex, pageChange }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <ArticleItem key={index} article={article}></ArticleItem>
      ))}
      <Flex justifyContent="center">
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex + 1}
          onChange={pageNum => {
            pageChange(pageNum);
          }}
        />
      </Flex>
    </div>
  );
};

export default ArticleItemList;
