import prettier from 'prettier'
import siteMetadata from 'data/siteMetadata'
import { GetStaticProps } from 'next'
import { getAllTags } from '@/lib/tags'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { POSTS_PER_PAGE } from './blog'
import fs from 'fs'

async function generateSiteMap() {
  const allPosts = await getAllFilesFrontMatter()
  const tags = Object.keys(await getAllTags())
  const prettierConfig = await prettier.resolveConfig('/prettier.config.js')

  const rootPage = ['', '/blog', '/tags']
  const blogPages = Array.from(
    { length: Math.floor(allPosts.length / POSTS_PER_PAGE) - 1 },
    (_, i) => `/blog/page/${i + 2}`
  )
  const allPages = [
    ...rootPage,
    ...blogPages,

    ...tags.map((tags) => {
      return `/tags/${tags}`
    }),
  ]

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
          ${allPages
            .map((page) => {
              let lastmod = new Date().toJSON()
              return `
                    <url>
                        <loc>${siteMetadata.siteUrl}${page}</loc>
                        <lastmod>${lastmod}</lastmod>
                    </url> 
                    `
            })
            .join('')}
          ${allPosts
            .map((post) => {
              let lastmod = new Date().toJSON()
              if (post.lastmod) {
                lastmod = new Date(post.lastmod).toJSON()
              } else {
                lastmod = fs.statSync(post.fileName).mtime.toJSON()
              }
              return `
                      <url>
                          <loc>${siteMetadata.siteUrl}/blog/${post.slug}</loc>
                          <lastmod>${lastmod}</lastmod>
                      </url>
                      `
            })
            .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })
  return formatted
}

export const getStaticProps: GetStaticProps = async () => {
  const siteMap = await generateSiteMap()
  fs.writeFileSync('public/sitemap.xml', siteMap)
  return { props: {} }
}

export default function SiteMap() {
  return null
}
