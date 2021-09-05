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
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url("https://ddadaal.me/static/mainbg-c29b6b093ecab87d9c66ef547346cd5c.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      ></div>
    </BasicLayout>
  );
};

export default BlogIndex;
