import Pagination from '@/components/Pagination';
import { navigateToArticle } from '@/utils/article';
import React, { FunctionComponent } from 'react';
import ArticleItem from './ListItem';

interface Props {
  articles: GatsbyTypes.MarkdownRemark[];
  pageCount: number;
  pageIndex: number;
}

const ArticleItemList: FunctionComponent<Props> = ({ articles, pageCount, pageIndex }) => {
  return (
    <div className="md:w-2/3">
      {articles.map((article, index) => (
        <ArticleItem key={index} article={article}></ArticleItem>
      ))}
      <div className="flex justify-center">
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex + 1}
          onChange={toPage => {
            navigateToArticle(toPage === 1 ? '' : `/${toPage}`);
          }}
        />
      </div>
    </div>
  );
};

export default ArticleItemList;
