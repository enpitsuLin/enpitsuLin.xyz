import Pagination from '@/components/Pagination';
import { navigateToArticle } from '@/utils/article';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import ArticleItem from './ListItem';

const ItemList = styled.div`
  width: 66.66667%;

  .list-footer {
    display: flex;
    justify-content: center;
  }
`;

interface Props {
  articles: GatsbyTypes.MarkdownRemark[];
  pageCount: number;
  pageIndex: number;
}

const ArticleItemList: FunctionComponent<Props> = ({ articles, pageCount, pageIndex }) => {
  return (
    <ItemList>
      {articles.map((article, index) => (
        <ArticleItem key={index} article={article}></ArticleItem>
      ))}
      <div className="list-footer">
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex + 1}
          onChange={toPage => {
            navigateToArticle(toPage === 1 ? '' : `/${toPage}`);
          }}
        />
      </div>
    </ItemList>
  );
};

export default ArticleItemList;
