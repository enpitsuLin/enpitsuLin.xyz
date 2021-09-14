import React, { FunctionComponent } from 'react';
import Frontmatter from './Frontmatter';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleHeader: FunctionComponent<Props> = ({ article }) => {
  return (
    <div>
      <div>
        <p className="title"> {article.frontmatter?.title || '无标题'}</p>
        <Frontmatter article={article} />
      </div>
    </div>
  );
};

export default ArticleHeader;
