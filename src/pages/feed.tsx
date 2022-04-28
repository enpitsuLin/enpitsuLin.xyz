import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res, req } = ctx
  const allPosts = await getAllFilesFrontMatter()

  if (!res) return
  res.setHeader('Content-Type', 'text/xml')

  const rss = generateRss(allPosts)
  res.write(rss)
  res.end()
  return { props: {} }
}

export default () => {}
