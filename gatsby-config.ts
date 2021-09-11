import path from 'path';

const siteMetadata = {
  title: `enpitsuLin's Blog`,
  author: `enpitsuLin`,
  description: `一根有梦想的笔 想描绘脑海里的场景.`,
  siteUrl: `https://enpitsulin.github.io/`,
  lastUpdateTime: new Date()
};

const plugins = [
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/source/_posts`,
      name: `posts`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/source/`,
      name: `blog`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`
    }
  },
  {
    resolve: 'gatsby-plugin-root-import',
    options: {
      '@': path.join(__dirname, 'src')
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
          resolve: 'gatsby-remark-vscode',
          options: {
            inlineCode: {
              marker: '±'
            },
            theme: 'Dark+ (default dark)',
            languageAliases: {
              shell: 'sh'
            }
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
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map(node => {
              return Object.assign({}, node.frontmatter, {
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + `articles/` + node.fields.slug,
                guid: site.siteMetadata.siteUrl + `articles/` + node.fields.slug,
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
 /*  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `enpitsuLin's Blog`,
      short_name: `enpitsuLin`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#156363`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
    }
  }, */
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-gatsby-cloud`,
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
  {
    resolve: `gatsby-plugin-typegen`,
    options: {
      outputPath: `src/gatsby-types.d.ts`,
      emitSchema: {
        'src/__generated__/gatsby-introspection.json': true,
        'src/__generated__/gatsby-plugin-documents.graphql': true
      },
      emitPluginDocuments: {
        'src/__generated__/gatsby-plugin-documents.graphql': true
      }
    }
  },
  `gatsby-plugin-postcss`,
  {
    resolve: `gatsby-plugin-styled-components`,
    options: {
      // Add any options here
    },
  },
];

export { siteMetadata, plugins };
