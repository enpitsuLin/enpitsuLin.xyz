import React, { FunctionComponent, useEffect, useState } from 'react';
import { PageRendererProps } from 'gatsby';
import styled from 'styled-components';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import useScroll from '@/hooks/useScroll';

import Header from './components/Header';
import Footer from './components/Footer';
import ToTop from '@/components/Totop';

interface Props extends PageRendererProps {}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
`;

const MainContent = styled.main`
  flex: 0 0 100%;
  min-height: 100vh;
`;

const BasicLayout: FunctionComponent<Props> = ({ children }) => {
  const data = useSiteMetadata();
  const title = data.site?.siteMetadata?.title as string;

  return (
    <Layout>
      <Header title={title} />
      <ToTop />
      <MainContent>{children}</MainContent>
      <Footer />
    </Layout>
  );
};

export default BasicLayout;
