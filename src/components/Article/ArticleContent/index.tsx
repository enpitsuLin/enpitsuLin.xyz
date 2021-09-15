import classNames from 'classnames';
import React, { forwardRef } from 'react';
// import './style.css';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
  excerpt?: boolean;
}

const ArticleContent = forwardRef<HTMLDivElement, Props>(({ article, excerpt }, ref) => {
  return (
    <div>
      <div
        className={classNames('article-content', excerpt && 'excerpt')}
        dangerouslySetInnerHTML={{
          __html: excerpt ? article.frontmatter?.description || (article.excerpt as string) : (article.html as string)
        }}
        ref={ref}
        itemProp="articleBody"
      />
    </div>
  );
});
export default ArticleContent;
