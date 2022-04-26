import { TagSEO } from '@/components/SEO'
import siteMetadata from 'data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import path from 'path'
import { PostFrontMatter } from '@/types/PostFrontMatter'

const root = process.cwd()

export const getServerSideProps: GetServerSideProps<{
  posts: PostFrontMatter[]
  tag: string
}> = async (context) => {
  const tag = context.params.tag as string
  const allPosts = await getAllFilesFrontMatter()
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  )

  // rss
  /* if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  } */

  return { props: { posts: filteredPosts, tag } }
}

export default function Tag({
  posts,
  tag,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
