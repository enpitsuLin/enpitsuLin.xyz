import { PageSEO } from '@/components/SEO'
import siteMetadata from 'data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { PostFrontMatter } from '@/types/PostFrontMatter'

export const getServerSideProps: GetServerSideProps<{
  posts: PostFrontMatter[]
  initialDisplayPosts: PostFrontMatter[]
  pagination: { currentPage: number; totalPages: number }
}> = async (context) => {
  const {
    params: { page },
  } = context

  const totalPosts = await getAllFilesFrontMatter()

  const posts = totalPosts
  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
