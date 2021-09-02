import * as React from 'react';
import { PageRendererProps } from 'gatsby';

import Layout from '../components/Layout/';
import Seo from '../components/seo';

type Props = PageRendererProps;

const NotFoundPage: React.FC<Props> = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
