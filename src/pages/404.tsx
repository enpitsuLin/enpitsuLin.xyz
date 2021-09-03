import React from 'react';
import { PageRendererProps, Link } from 'gatsby';
import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';

type Props = PageRendererProps;

const NotFoundPage: React.FC<Props> = ({ location }) => {
  return (
    <BasicLayout location={location}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>four oh-four~</p>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/">回到主页</Link>
    </BasicLayout>
  );
};

export default NotFoundPage;
