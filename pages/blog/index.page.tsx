import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from '~/components/Link';
import { Pre } from '~/components/Pre';
import { PostSEO } from '~/components/SEO';
import CarbonRotateClockwise from '~icons/carbon/rotate-clockwise';
import CarbonRotateCounterclockwise from '~icons/carbon/rotate-counterclockwise';
import CarbonZoomIn from '~icons/carbon/zoom-in';
import CarbonZoomOut from '~icons/carbon/zoom-out';
import { Props } from './index.page.server';
import { PostWrapper } from './PostWrapper';

const MDXComponents: MDXContentProps['components'] = {
  Image: ({ src, alt, height, width }) => (
    <PhotoView src={src}>
      <span className="flex flex-col items-center justify-center relative">
        <img loading="lazy" src={src} alt={alt} height={height} width={width} className="cursor-zoom-out" />
        {alt && <span className="p-0 !m-0 text-sm opacity-60">{alt}</span>}
      </span>
    </PhotoView>
  ),
  a: Link,
  pre: Pre,
  del: (props) => (
    <del title="你知道的太多了" className="heimu">
      {props.children}
    </del>
  )
};

export const Page: React.FC<Props> = ({ post, code, toc, prev, next }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <>
      <PostSEO {...post} />
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
          );
        }}
      >
        <PostWrapper post={post} toc={toc} prev={prev} next={next}>
          <Component components={MDXComponents} />
        </PostWrapper>
      </PhotoProvider>
    </>
  );
};
