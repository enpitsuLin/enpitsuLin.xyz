import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import kebabCase from '@/lib/utils/kebabCase'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res, req } = ctx
  const allPosts = await getAllFilesFrontMatter()
  const url = new URL(req.url, `http://${req.headers.host}`)
  const tag = url.searchParams.get('tag')
  if (tag) {
    res.setHeader('Content-Type', 'text/xml')
    const filteredPosts = allPosts.filter(
      (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
    )
    const rss = generateRss(filteredPosts, `/feed?tag=${tag}`)
    res.write(rss)
    res.end()
  } else {
    res.setHeader('Content-Type', 'text/xml')

    const rss = generateRss(allPosts)
    res.write(rss)
    res.end()
  }

  return { props: {} }
}

export default function Feed() {
  return null
}