import { MDXRemote, MDXRemoteProps, MDXRemoteSerializeResult } from 'next-mdx-remote'
import PageTitle from '@/components/PageTitle'
import { mdxToHtml } from '@/lib/mdx'
import { getClient, Post, postQuery } from '@/lib/sanity'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { FiRotateCcw, FiRotateCw, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import Image from '../../components/Image'
import CustomLink from '../../components/Link'
import Pre from '../../components/Pre'
import TOCInline from '../../components/TOCInline'
import PostLayout from '@/layouts/PostLayout'
import { Toc } from '@/types/Toc'

interface Props {
  post: Post
  content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
  readingTime: string
  wordCount: number
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
  toc: Toc
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  const { post } = await getClient().fetch<{ post: Post }>(postQuery, {
    slug: params.slug,
  })
  const { html, readingTime, wordCount, toc } = await mdxToHtml(post.content)
  return {
    props: {
      post,
      content: html,
      readingTime,
      wordCount,
      toc,
    },
  }
}
const MarkdownImg = ({ src, alt, height = 0, width = 0 }) => (
  <PhotoView src={src}>
    <span className="flex flex-col items-center justify-center relative">
      <Image
        loading="lazy"
        src={src}
        alt={alt}
        objectFit="cover"
        layout="intrinsic"
        height={height}
        width={width}
        className="cursor-zoom-in"
      />
      {alt && <span className="p-0 !m-0 text-sm opacity-60">{alt}</span>}
    </span>
  </PhotoView>
)

const Blog: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  post,
  content,
  readingTime,
  wordCount,
  toc,
}) => {
  const components: MDXRemoteProps['components'] = {
    Image: MarkdownImg,
    //@ts-ignore
    TOCInline,
    a: ({ href }) => <CustomLink href={href} />,
    pre: Pre,
    del: (props) => (
      <del title="你知道的太多了" className="heimu">
        {props.children}
      </del>
    ),
  }
  return (
    <>
      {process.env.NODE_ENV === 'development' ? (
        <PhotoProvider
          maskOpacity={0.75}
          toolbarRender={({ onScale, scale, onRotate, rotate }) => {
            return (
              <>
                <FiZoomIn
                  size={44}
                  className="p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onScale(scale + 1)}
                />
                <FiZoomOut
                  size={44}
                  className="p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onScale(scale - 1)}
                />
                <FiRotateCcw
                  size={44}
                  className="p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onRotate(rotate - 90)}
                />
                <FiRotateCw
                  size={44}
                  className="p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onRotate(rotate + 90)}
                />
              </>
            )
          }}
        >
          <PostLayout
            frontMatter={{
              title: post.title,
              date: post.date,
              readingTime: {
                //@ts-ignore
                minutes: readingTime,
                words: wordCount,
              },
              slug: post.slug,
              tags: post.tags,
            }}
            toc={toc}
          >
            <MDXRemote {...content} components={components} />
          </PostLayout>
        </PhotoProvider>
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
