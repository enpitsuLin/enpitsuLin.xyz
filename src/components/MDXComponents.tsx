/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import Pre from './Pre'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import CarbonZoomIn from '~icons/carbon/zoom-in'
import CarbonZoomOut from '~icons/carbon/zoom-out'
import CarbonRotateClockwiseAlt from '~icons/carbon/rotate-clockwise-alt'
import CarbonRotateCounterclockwise from '~icons/carbon/rotate-counterclockwise'
import 'react-photo-view/dist/react-photo-view.css'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  img: ({ alt, src, ...rest }) => (
    <PhotoView src={src}>
      <span className="flex flex-col items-center justify-center">
        <img src={src} alt={alt} {...rest} className="cursor-zoom-in" />
        {alt && <span className="p-0 !m-0 text-sm opacity-60">{alt}</span>}
      </span>
    </PhotoView>
  ),
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
            <CarbonZoomIn
              className="text-36px p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
              onClick={() => onScale(scale + 1)}
            />
            <CarbonZoomOut
              className="text-36px p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
              onClick={() => onScale(scale - 1)}
            />
            <CarbonRotateCounterclockwise
              className="text-36px p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
              onClick={() => onRotate(rotate - 90)}
            />
            <CarbonRotateClockwiseAlt
              className="text-36px p-[12px] transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
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
