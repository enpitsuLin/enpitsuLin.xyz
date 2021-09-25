import { Box } from '@chakra-ui/layout';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import './style.css';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
  excerpt?: boolean;
}

const ArticleContent = forwardRef<HTMLDivElement, Props>(({ article, excerpt = false }, ref) => {
  return (
    <Box>
      <div
        className={classNames('article-content', excerpt && 'excerpt')}
        dangerouslySetInnerHTML={{
          __html: excerpt ? article.frontmatter?.description || (article.excerpt as string) : (article.html as string)
        }}
        ref={ref}
        itemProp="articleBody"
      />
    </Box>
  );
});
export default ArticleContent;
