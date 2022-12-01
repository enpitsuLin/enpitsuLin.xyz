import { MDXLayoutRenderer } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import { PostFrontMatter } from '@/types/PostFrontMatter'
import { Toc } from '@/types/Toc'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const DEFAULT_LAYOUT = 'PostLayout'

interface Props {
  post: { mdxSource: string; toc: Toc; frontMatter: PostFrontMatter }
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  const slug = (params.slug as string[]).join('/')
  const allPosts = await getAllFilesFrontMatter()
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === slug)
  const prev: { slug: string; title: string } = allPosts[postIndex + 1] || null
  const next: { slug: string; title: string } = allPosts[postIndex - 1] || null
  const post = await getFileBySlug<PostFrontMatter>('blog', slug)

  return {
    props: {
      post,
      prev,
      next,
    },
  }
}

const Blog: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  post,
  prev,
  next,
}) => {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {'draft' in frontMatter &&
      (process.env.NODE_ENV === 'development' || frontMatter.draft !== true) ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}

export default Blog
