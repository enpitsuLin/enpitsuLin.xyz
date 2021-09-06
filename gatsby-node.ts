/// <reference path="./src/gatsby-types.d.ts" />
import { GatsbyNode, Actions } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { resolve } from 'path';

type CreatePages = GatsbyNode['createPages'];

type CreatePage = Actions['createPage'];

/** 文章页模板 */
const ArticleTemplate = resolve('./src/templates/article.tsx');
/** 文章列表 分页模板 */
const ArticlesListTemplate = resolve('./src/templates/articles-list.tsx');
/** 文章所属的路由 列表为 `${__ARTICLE_PATH__}/:pageNum` 文章为 `${__ARTICLE_PATH__}/:articleName` */
const __ARTICLE_PATH__ = 'articles';

export const createPages: CreatePages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<{
    allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection;
  }>(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        nodes {
          id
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

      createPage({
        path: `${__ARTICLE_PATH__}${article.fields?.slug}`,
        component: ArticleTemplate,
        context: {
          id: article.id,
          previousPostId,
          nextPostId
        }
      });
    });
    generateArticleList(createPage, articles as GatsbyTypes.MarkdownRemark[], 5);
  }
};

/**
 * 生成文章列表页
 * @param createPage
 * @param articles
 * @param size
 */
const generateArticleList = (createPage: CreatePage, articles: GatsbyTypes.MarkdownRemark[], pageSize: number) => {
  const pagePath = (index: number) => `${__ARTICLE_PATH__}${index === 0 ? '' : `/${index + 1}`}`;

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

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
      type SiteSiteMetadata {
        author: String
        siteUrl: String
        lastUpdateTime: Date
      }
  
      type MarkdownRemark implements Node {
        frontmatter: Frontmatter
        fields: Fields
      }
  
      type Frontmatter {
        title: String
        description: String
        date: Date @dateformat
      }
  
      type Fields {
        slug: String
      }
    `);
};
