import React, { FunctionComponent, useEffect, useState } from 'react';
import { PageRendererProps } from 'gatsby';
import styled from 'styled-components';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import useScroll from '@/hooks/useScroll';

import Header from './components/Header';
import Footer from './components/Footer';
import ToTop from '@/components/Totop';

import { GlobalStyle } from '@/styles/global';

interface Props extends PageRendererProps {}

const Layout = styled.div`
  background: var(--background-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;

  overflow-wrap: break-word;
`;

const MainContent = styled.main`
  flex: 0 0 100%;
  min-height: 100vh;
`;

const BasicLayout: FunctionComponent<Props> = ({ location, children }) => {
  const data = useSiteMetadata();

  const [headerTransparent, setHeaderTransparent] = useState(true);
  const scroll = useScroll();

  const siteMetadata = data.site?.siteMetadata || { title: 'Title', description: '' };
  const isRootPath = location.pathname == '/';

  useEffect(() => {
    setHeaderTransparent(scroll.top <= 10 && isRootPath);
  }, [scroll]);
  return (
    <Layout>
      <GlobalStyle />
      <Header siteMetadata={siteMetadata} location={location} headerTransparent={headerTransparent} />
      <ToTop />
      <MainContent>{children}</MainContent>

      <Footer />
    </Layout>
  );
};

export default BasicLayout;
