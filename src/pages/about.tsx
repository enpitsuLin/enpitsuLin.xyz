import * as React from 'react';
import { PageRendererProps } from 'gatsby';

import Layout from '../components/Layout/';
import Seo from '../components/seo';

type Props = PageRendererProps;

const About: React.FC<Props> = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="关于我" />
      <div className="about">
        <i className="icon-about"></i>
        <p>关于我</p>
      </div>
    </Layout>
  );
};

export default About;
