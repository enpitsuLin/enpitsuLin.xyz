import classNames from 'classnames';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import './style.css';

const Content = styled.div<{ excerpt: boolean }>`
  width: 100%;
  ${props => {
    return (
      props.excerpt &&
      `
    @media ( min-width:768px){
      width:75%;
      flex:0 0 75%;
    }`
    );
  }}
`;

interface Props {
  article: GatsbyTypes.MarkdownRemark;
  excerpt?: boolean;
}

const ArticleContent = forwardRef<HTMLDivElement, Props>(({ article, excerpt }, ref) => {
  return (
    <Content excerpt={excerpt}>
      <div
        className={classNames('article-content', excerpt && 'excerpt')}
        dangerouslySetInnerHTML={{
          __html: excerpt ? article.frontmatter?.description || (article.excerpt as string) : (article.html as string)
        }}
        ref={ref}
        itemProp="articleBody"
      />
    </Content>
  );
});
export default ArticleContent;
