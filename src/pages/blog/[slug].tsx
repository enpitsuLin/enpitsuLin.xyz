import Image from '@/components/Image'
import CustomLink from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Pre from '@/components/Pre'
import TOCInline from '@/components/TOCInline'
import PostLayout from '@/layouts/PostLayout'
import { mdxToHtml } from '@/lib/mdx'
import { getPost } from '@/lib/sanity'
import { Post, Toc } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { MDXRemote, MDXRemoteProps, MDXRemoteSerializeResult } from 'mdx-to-html'
import CarbonRotateClockwise from '~icons/carbon/rotate-clockwise'
import CarbonRotateCounterclockwise from '~icons/carbon/rotate-counterclockwise'
import CarbonZoomIn from '~icons/carbon/zoom-in'
import CarbonZoomOut from '~icons/carbon/zoom-out'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

interface Props {
  post: Post
  content: MDXRemoteSerializeResult
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  const originPost = await getPost(params.slug as string)
  //@ts-ignore
  const { html, readingTime, wordCount, toc } = await mdxToHtml(originPost.content)

  const post: Post = {
    ...originPost,
    readingTime,
    wordCount,
    toc,
  }
  return {
    props: {
      post,
      content: html,
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
                <CarbonZoomIn
                  className="h-[44px] w-[44px] p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onScale(scale + 1)}
                />
                <CarbonZoomOut
                  className="h-[44px] w-[44px] p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onScale(scale - 1)}
                />
                <CarbonRotateCounterclockwise
                  className="h-[44px] w-[44px] p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onRotate(rotate - 90)}
                />
                <CarbonRotateClockwise
                  className="h-[44px] w-[44px] p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                  onClick={() => onRotate(rotate + 90)}
                />
              </>
            )
          }}
        >
          <PostLayout post={post}>
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
