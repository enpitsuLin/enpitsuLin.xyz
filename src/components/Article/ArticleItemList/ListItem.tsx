import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import Frontmatter from '../Frontmatter';
import ArticleContent from '../ArticleContent';
import styled from 'styled-components';

const Item = styled.div`
  margin-bottom: 1.5rem;

  .article-title {
    > a {
      font-size: 2rem;
      &:hover {
        color: var(--primary-400);
      }
    }
  }
`;

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleItem: FunctionComponent<Props> = ({ article }) => {
  return (
    <Item>
      <div className="article-title">
        <Link to={`/articles${article.fields?.slug}`}>{article.frontmatter?.title}</Link>
      </div>
      <Frontmatter article={article} />
      <ArticleContent article={article} excerpt={true} />
      <hr />
    </Item>
  );
};

export default ArticleItem;
