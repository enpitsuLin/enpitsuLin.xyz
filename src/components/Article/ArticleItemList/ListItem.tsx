import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import Frontmatter from '../Frontmatter';

interface Props {
  article: GatsbyTypes.MarkdownRemark;
}

const ArticleItem: FunctionComponent<Props> = ({ article }) => {
  return (
    <div className="text-white mb-6">
      <div className="py-2">
        <Link to={`/articles${article.fields?.slug}`} className="text-4xl hover:text-primary-400">
          {article.frontmatter?.title}
        </Link>
      </div>
      <Frontmatter article={article} />
      <div dangerouslySetInnerHTML={{ __html: article.excerpt as string }}></div>
      <hr className="pt-1 mt-3 border-opacity-10" />
    </div>
  );
};

export default ArticleItem;
