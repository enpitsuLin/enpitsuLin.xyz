import prettier from 'prettier'
import siteMetadata from 'data/siteMetadata'
import { GetServerSideProps } from 'next'
import { getAllTags } from '@/lib/tags'
import { getAllFilesFrontMatter } from '@/lib/mdx'

async function generateSiteMap() {
  const allPosts = await getAllFilesFrontMatter()
  const tags = Object.keys(await getAllTags())
  const prettierConfig = await prettier.resolveConfig('/prettier.config.js')

  const allPages = [
    ...allPosts.map((post) => {
      return `/blog/${post.slug}`
    }),
    ...tags.map((tags) => {
      return `/tags/${tags}`
    }),
  ]

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allPages
              .map((page) => {
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${page}</loc>
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

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml')
  const siteMap = await generateSiteMap()
  res.write(siteMap)
  res.end()
  return { props: {} }
}

export default function SiteMap() {
  return null
}
