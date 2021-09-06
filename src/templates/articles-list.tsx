import React, { FunctionComponent } from 'react';
import { graphql, Link, PageRendererProps } from 'gatsby';
import { calcArticleWordCount, navigateToArticle } from '@/utils/article';
import { BasicLayout } from '@/layouts';
import classNames from 'classnames';
import Frontmatter from '@/components/Article/Frontmatter';
import Pagination from '@/components/Pagination';
import Seo from '@/components/seo';

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection;
  };
  /** 从CreatePage传递进来的参数 */
  pageContext: {
    pageCount: number;
    pageIndex: number;
  };
}

const BlogPostTemplate: FunctionComponent<Props> = ({ data, location, pageContext }) => {
  const articles = data.allMarkdownRemark.nodes;
  const { pageCount, pageIndex } = pageContext;

  return (
    <BasicLayout location={location}>
      <Seo title="文章" />
      <div className={classNames('mx-auto max-w-7xl page-container', 'p-4')}>
        <div className="flex">
          <div className="md:w-2/3">
            {articles.map((article, index) => {
              const frontmatter = article.frontmatter as GatsbyTypes.Frontmatter;
              const timeToRead = article.timeToRead as number;
              const words = calcArticleWordCount(article);
              const frontmatterProps = { frontmatter, timeToRead, words };
              return (
                <div key={index} className="text-white mb-6">
                  <Link to={`/articles${article.fields?.slug}`} className="text-4xl py-1 hover:text-primary-400">
                    {article.frontmatter?.title}
                  </Link>
                  <Frontmatter {...frontmatterProps} />
                  <div dangerouslySetInnerHTML={{ __html: article.excerpt as string }}></div>
                  <hr className="pt-1 mt-3 border-opacity-10" />
                </div>
              );
            })}
            <div className="flex justify-center">
              <Pagination
                pageCount={pageCount}
                currentPage={pageIndex + 1}
                onChange={toPage => {
                  navigateToArticle(toPage === 1 ? '' : `/${toPage}`);
                }}
              />
            </div>
          </div>
          <div className="w-1/3 hidden md:block"></div>
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
        excerpt(format: HTML, truncate: true)
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
