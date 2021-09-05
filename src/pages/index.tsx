import React from 'react';
import { PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';

type Props = PageRendererProps;

const BlogIndex: React.FC<Props> = ({ location }) => {
  return (
    <BasicLayout location={location}>
      <Seo title="首页" />
      <div
        className="h-screen"
        style={{
          filter: 'blur(5px)'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url(/images/blog-home-pic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        ></div>
      </div>
    </BasicLayout>
  );
};

export default BlogIndex;
