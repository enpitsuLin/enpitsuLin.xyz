import React from 'react';
import { PageRendererProps } from 'gatsby';

import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';

type Props = PageRendererProps;

const About: React.FC<Props> = ({ location }) => {
  return (
    <BasicLayout location={location}>
      <Seo title="关于" />
      <div className="about">
        <p>关于我</p>
      </div>
    </BasicLayout>
  );
};

export default About;
