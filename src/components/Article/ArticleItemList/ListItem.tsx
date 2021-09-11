import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import Frontmatter from '../Frontmatter';
import ArticleContent from '../ArticleContent';
import styled from 'styled-components';

const Item = styled.div`
  color: #fff;
  margin-bottom: 1.5rem;
  > hr {
    padding-top: 0.25rem;
    margin-top: 0.75rem;
  }
  .article-title {
    padding: 0 0.5rem;
    > a {
      font-size: 1rem;
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
      <div className="py-2">
        <Link to={`/articles${article.fields?.slug}`}>{article.frontmatter?.title}</Link>
      </div>
      <Frontmatter article={article} />
      <ArticleContent article={article} excerpt={true} />
      <hr />
    </Item>
  );
};

export default ArticleItem;
