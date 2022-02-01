import { GatsbyConfig, PluginRef } from 'gatsby';
import path from 'path';

const siteTitle = `enpitsuLin's Blog`;
const siteAuthor = `enpitsuLin`;
const siteDescription = `一根有梦想的笔 想描绘脑海里的场景.`;
const siteUrl = `https://enpitsulin.github.io/`;

const Plugins: PluginRef[] = [
  {
    resolve: 'gatsby-plugin-typescript',
    options: {
      isTSX: true,
      allExtensions: true
    }
  },
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: path.join(__dirname, '../content/posts'),
      name: `posts`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: path.join(__dirname, '../content/page'),
      name: `blog`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: path.join(__dirname, '../src/assets/images')
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      // prettier-ignore
      "excerpt_separator": `<!-- more -->`,
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1140,
            quality: 90,
            showCaptions: true,
            linkImagesToOriginal: false
          }
        },
        {
          resolve: `gatsby-remark-images-medium-zoom`,
          options: {
            background: '#222',
            zIndex: 1040
          }
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`
          }
        },
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            icon: false,
            removeAccents: true
          }
        },
        {
          resolve: `@enpitsulin/gatsby-remark-shiki`,
          options: {
            theme: 'one-dark-pro'
          }
        },
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`
      ]
    }
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  // {
  //   resolve: `gatsby-plugin-google-analytics`,
  //   options: {
  //     trackingId: `ADD YOUR TRACKING ID HERE`,
  //   },
  // },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
      feeds: [
        {
          title: "enpitsulin's blog rss",
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map(node => {
              return Object.assign({}, node.frontmatter, {
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + `/articles` + node.fields.slug,
                guid: site.siteMetadata.siteUrl + `/articles` + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }]
              });
            });
          },
          query: `
                {
                  allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] },
                  ) {
                    nodes {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              `,
          output: '/rss.xml'
        }
      ]
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `enpitsuLin's Blog`,
      short_name: `enpitsuLin`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#156363`,
      display: `standalone`,
      icon: `src/assets/images/icon.png`
    }
  },
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-gatsby-cloud`,
  `gatsby-plugin-offline`,
  {
    resolve: `gatsby-plugin-typegen`,
    options: {
      outputPath: `src/gatsby-types.d.ts`
    }
  },
  {
    resolve: `gatsby-plugin-netlify-cms`,
    options: {
      modulePath: path.join(__dirname, `../src/cms/index`)
    }
  }
];

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    title: siteTitle,
    author: siteAuthor,
    description: siteDescription,
    siteUrl,
    lastUpdateTime: new Date()
  },
  plugins: Plugins
};

export default gatsbyConfig;
