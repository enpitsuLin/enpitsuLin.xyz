/* eslint-disable react/display-name */
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
import { FiRotateCcw, FiRotateCw, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import TOCInline from './TOCInline'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = dynamic(() => import(`../layouts/${layout}`), { ssr: false })
  return <Layout {...rest} />
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

export const MDXComponents: ComponentMap = {
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
  wrapper: Wrapper,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return (
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
      <MDXLayout layout={layout} components={MDXComponents} {...rest} />
    </PhotoProvider>
  )
}