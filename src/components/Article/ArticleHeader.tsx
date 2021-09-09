import React, { FunctionComponent } from 'react';
import Frontmatter from './Frontmatter';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleHeader: FunctionComponent<Props> = ({ article }) => {
  return (
    <div className="h-64 dark:bg-skobeloff flex justify-center items-center">
      <div>
        <p className="text-3xl mb-2 text-center"> {article.frontmatter?.title || '无标题'}</p>
        <Frontmatter article={article} />
      </div>
    </div>
  );
};

export default ArticleHeader;
