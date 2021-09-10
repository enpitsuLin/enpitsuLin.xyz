import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';

import { BasicLayout } from '@/layouts/';
import Seo from '@/components/seo';
import AnimatedContent from '@/components/AnimatedContent';

type Props = PageRendererProps;

const About: FunctionComponent<Props> = ({ location }) => {
  return (
    <BasicLayout location={location}>
      <Seo title="关于" />
      <AnimatedContent>
        <div className="about">
          <p>关于我</p>
        </div>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default About;
