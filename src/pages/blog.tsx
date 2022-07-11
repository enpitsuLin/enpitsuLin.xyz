import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from 'data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ComponentProps } from 'react'

export const POSTS_PER_PAGE = 5

export const getServerSideProps: GetServerSideProps<{
  posts: ComponentProps<typeof ListLayout>['posts']
  initialDisplayPosts: ComponentProps<typeof ListLayout>['initialDisplayPosts']
  pagination: ComponentProps<typeof ListLayout>['pagination']
}> = async (ctx) => {
  const posts = await getAllFilesFrontMatter()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}
const Blog: React.FC<
  React.PropsWithChildren<InferGetServerSidePropsType<typeof getServerSideProps>>
> = ({ posts, initialDisplayPosts, pagination }) => {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
export default Blog
