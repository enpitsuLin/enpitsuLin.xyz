import { Post } from '@/types'
import { TagSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import { getClient, indexQuery } from '@/lib/sanity'
import kebabCase from '@/lib/utils/kebabCase'
import siteMetadata from 'data/siteMetadata'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const root = process.cwd()

export const getServerSideProps: GetServerSideProps<{
  posts: Post[]
  tag: string
}> = async (context) => {
  const tag = context.params.tag as string
  const allPosts = await getClient().fetch<Post[]>(indexQuery)
  const filteredPosts = allPosts.filter((post) => post.tags.map((t) => kebabCase(t)).includes(tag))

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
