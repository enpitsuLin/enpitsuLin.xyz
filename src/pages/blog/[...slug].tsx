import fs from 'fs'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { AuthorFrontMatter } from '@/types/AuthorFrontMatter'
import { PostFrontMatter } from '@/types/PostFrontMatter'
import { Toc } from '@/types/Toc'
import { i18nPaths } from '@/lib/utils/i18n'

const DEFAULT_LAYOUT = 'PostSimple'

interface Props {
  post: { mdxSource: string; toc: Toc; frontMatter: PostFrontMatter }
  authorDetails: AuthorFrontMatter[]
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getFiles('blog')
  const paths = posts.map((p) => ({
    params: {
      slug: formatSlug(p).split('/'),
    },
  }))

  return {
    paths: i18nPaths(paths),
    fallback: false,
  }
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
  const slug = (params.slug as string[]).join('/')
  const allPosts = await getAllFilesFrontMatter()
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === slug)
  const prev: { slug: string; title: string } = allPosts[postIndex + 1] || null
  const next: { slug: string; title: string } = allPosts[postIndex - 1] || null
  const post = await getFileBySlug<PostFrontMatter>('blog', slug)
  // @ts-ignore
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug<AuthorFrontMatter>('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
    },
  }
}

const Blog: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  authorDetails,
  prev,
  next,
}) => {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {'draft' in frontMatter && frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
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
