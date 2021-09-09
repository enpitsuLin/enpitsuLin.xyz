import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import Frontmatter from '../Frontmatter';
import ArticleContent from '../ArticleContent';

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
      <ArticleContent article={article} excerpt={true} />
      {/* <div dangerouslySetInnerHTML={{ __html: article.excerpt as string }} style={{ fontSize: 15 }}></div> */}
      <hr className="pt-1 mt-3 border-opacity-10" />
    </div>
  );
};

export default ArticleItem;