import React, { FunctionComponent } from 'react';
import Frontmatter from './Frontmatter';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
  background-color: rgb(22, 99, 99);
  .title {
    font-size: 1.875rem;
    line-height: 2.25rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
`;

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleHeader: FunctionComponent<Props> = ({ article }) => {
  return (
    <Header>
      <div>
        <p className="title"> {article.frontmatter?.title || '无标题'}</p>
        <Frontmatter article={article} />
      </div>
    </Header>
  );
};

export default ArticleHeader;
