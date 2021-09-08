import React, { forwardRef } from 'react';
import './style.css';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}
const ArticleContent = forwardRef<HTMLDivElement, Props>(({ article }, ref) => {
  return (
    <div className="w-full md:w-3/4 flex-3/4">
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.html as string }}
        ref={ref}
        itemProp="articleBody"
      />
    </div>
  );
});
export default ArticleContent;
