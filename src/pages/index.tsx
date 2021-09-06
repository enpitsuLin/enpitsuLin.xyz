import React, { FunctionComponent, useEffect, useState } from 'react';
import { PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';
import useTypeWriter from '@/hooks/useTypewriter';

type Props = PageRendererProps;

const maxims = ['Sow nothing, reap noting', 'Do what you love, Love what you do', 'Man proposes, God disposes'];

const BlogIndex: FunctionComponent<Props> = ({ location }) => {
  const [maxim, setMaxim] = useState(maxims[0]);
  const text = useTypeWriter(maxim);
  useEffect(() => {
    const timer = setInterval(() => {
      setMaxim(maxims[Math.floor(Math.random() * maxims.length)]);
    }, 7000);
    return () => {
      clearInterval(timer);
    };
  }, [maxim]);
  return (
    <BasicLayout location={location}>
      <Seo title="首页" />
      <div className="h-screen page-container relative">
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url(/images/blog-home-pic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
          className="flex items-center justify-center"
        >
          <div className="text-center text-white">
            <p className="text-5xl font-medium py-1 my-3">你好</p>
            <div className="py-1 my-2 h-6">
              <span>{text || ' '}</span>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default BlogIndex;
