import React, { FunctionComponent } from 'react';
import { graphql, Link, PageRendererProps, navigate } from 'gatsby';
import { BasicLayout } from '@/layouts';
import classNames from 'classnames';
import Frontmatter from '@/components/Article/Frontmatter';
import Pagination from '@/components/Pagination';

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection;
  };
}

const BlogPostTemplate: FunctionComponent<Props> = ({ data, location, ...rest }) => {
  const articles = data.allMarkdownRemark.nodes;
  const { totalCount, currentPage } = data.allMarkdownRemark.pageInfo;
  console.log(rest);

  return (
    <BasicLayout location={location}>
      <div className={classNames('mx-auto max-w-7xl')}>
        <div className="flex">
          <div className="w-2/3">
            {articles.map((article, index) => {
              const frontmatter = article.frontmatter as GatsbyTypes.Frontmatter;
              const timeToRead = article.timeToRead as number;
              const words = article.wordCount?.words as number;
              const frontmatterProps = { frontmatter, timeToRead, words };
              return (
                <div key={index} className="text-white mb-6">
                  <Link to={`/articles${article.fields?.slug}`} className="text-4xl py-1 hover:text-primary-400">
                    {article.frontmatter?.title}
                  </Link>
                  <Frontmatter {...frontmatterProps} />
                  <p>{article.excerpt}</p>
                  <hr className="pt-1 mt-3 border-opacity-10" />
                </div>
              );
            })}
            <div className="flex justify-center">
              <Pagination
                pageCount={totalCount}
                currentPage={currentPage}
                onChange={toPage => {
                  navigate('/articles' + (toPage === 1 ? '' : `/${toPage}`));
                }}
              />
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
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
        totalCount
        currentPage
        totalCount
        perPage
      }
    }
  }
`;
