/// <reference path="../src/gatsby-types.d.ts" />
import { GatsbyNode, Actions } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { resolve, join } from 'path';
const ArticleTemplate = resolve('./src/templates/article.tsx');
const ArticlesListTemplate = resolve('./src/templates/articles-list.tsx');

/** 文章所属的路由 列表为 `${ARTICLE_PATH}/:pageNum` 文章为 `${ARTICLE_PATH}/:articleName` */
const ARTICLE_PATH = 'articles';

type ArticlesQueryResult = { allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection };

/**
 * 生成文章列表页
 * @param createPage
 * @param articles
 * @param size
 */
const generateArticleList = (
  createPage: Actions['createPage'],
  articles: GatsbyTypes.MarkdownRemark[],
  pageSize: number
) => {
  const pagePath = (index: number) => `${ARTICLE_PATH}${index === 0 ? '' : `/${index + 1}`}`;

  const pageCount = Math.ceil(articles.length / pageSize);

  Array.from({ length: pageCount }).forEach((_, pageIndex) => {
    createPage({
      path: pagePath(pageIndex),
      component: ArticlesListTemplate,
      context: {
        limit: pageSize,
        skip: pageIndex * pageSize,
        pageCount,
        pageIndex,
        ids: articles.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map(article => article.id)
      }
    });
  });
};

/**
 * 导出gatsbyNode
 */
const gatsbyNode: GatsbyNode = {
  onCreateWebpackConfig: ({ actions }) => {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          '@': join(__dirname, '../src')
        }
      }
    });
  },

  createPages: async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const result = await graphql<ArticlesQueryResult>(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          nodes {
            id
            frontmatter {
              path
            }
            fields {
              slug
            }
          }
        }
      }
    `);

    if (result.errors || !result.data) {
      reporter.panicOnBuild('Some thing wrong on loading your articles', result.errors);
      return;
    }

    const articles = result.data.allMarkdownRemark.nodes;

    // create articles page by template
    if (articles.length > 0) {
      articles.forEach((article, index) => {
        const previousPostId = index === 0 ? null : articles[index - 1].id;
        const nextPostId = index === articles.length - 1 ? null : articles[index + 1].id;

        // frontmatter path first
        createPage({
          path: article.frontmatter.path || `${ARTICLE_PATH}${article.fields?.slug}`,
          component: ArticleTemplate,
          context: { id: article.id, previousPostId, nextPostId }
        });
      });
      generateArticleList(createPage, articles as GatsbyTypes.MarkdownRemark[], 5);
    }
  },
  onCreateNode: ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
      const value = createFilePath({ node, getNode });
      createNodeField({ name: `slug`, node, value });
    }
  }
};
export default gatsbyNode;
