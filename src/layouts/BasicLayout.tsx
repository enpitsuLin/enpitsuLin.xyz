import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';

import useSiteMetadata from '@/hooks/useSiteMetadata';

import ToTop from '@/components/Totop';

interface Props extends PageRendererProps {}

const BasicLayout: FunctionComponent<Props> = ({ location, children }) => {
  const data = useSiteMetadata();
  const siteMetadata = data.site?.siteMetadata || { title: 'Title', description: '' };
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-screen-lg px-6">
      <Header siteMetadata={siteMetadata} location={location} />
      <ToTop />
      <Container>{children}</Container>
      <Footer siteMetadata={siteMetadata}></Footer>
    </div>
  );
};

export default BasicLayout;
