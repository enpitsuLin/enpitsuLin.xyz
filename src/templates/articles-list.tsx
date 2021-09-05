import React, { FunctionComponent } from 'react';
import { graphql, Link, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import classNames from 'classnames';
import Frontmatter from '@/components/Article/Frontmatter';

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection;
  };
}

const BlogPostTemplate: FunctionComponent<Props> = ({ data, location }) => {
  const articles = data.allMarkdownRemark.nodes;
  const pageInfo = data.allMarkdownRemark.pageInfo;

  console.log(articles, pageInfo);

  return (
    <BasicLayout location={location}>
      <div className={classNames('mx-auto max-w-7xl')}>
        {articles.map((article, index) => {
          const frontmatter = article.frontmatter as GatsbyTypes.Frontmatter;
          const timeToRead = article.timeToRead as number;
          const words = article.wordCount?.words as number;
          const frontmatterProps = { frontmatter, timeToRead, words };
          return (
            <div key={index} className="text-white mb-6">
              <Link to={`/articles${article.fields?.slug}`} className="text-4xl py-1">
                {article.frontmatter?.title}
              </Link>
              <Frontmatter {...frontmatterProps} />
              <p>{article.excerpt}</p>
            </div>
          );
        })}
      </div>
    </BasicLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query articlesByIds($ids: [String], $limit: Int) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { id: { in: $ids } }
      limit: $limit
    ) {
      nodes {
        id
        excerpt(pruneLength: 160)
        html
        frontmatter {
          title
          date(formatString: "YYYY 年 MM月 DD日 ")
          description
          tags
        }
        fields {
          slug
        }
        timeToRead
        wordCount {
          words
        }
      }
      pageInfo {
        pageCount
        currentPage
        totalCount
        perPage
      }
    }
  }
`;
