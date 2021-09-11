import React, { FunctionComponent } from 'react';
import Frontmatter from './Frontmatter';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
  background-color: rgb(22, 99, 99);
`;

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleHeader: FunctionComponent<Props> = ({ article }) => {
  return (
    <Header>
      <div>
        <p className="text-3xl mb-2 text-center"> {article.frontmatter?.title || '无标题'}</p>
        <Frontmatter article={article} />
      </div>
    </Header>
  );
};

export default ArticleHeader;
