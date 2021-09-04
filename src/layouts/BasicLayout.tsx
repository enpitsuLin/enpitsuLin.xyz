import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { PageRendererProps } from 'gatsby';

import useSiteMetadata from '@/hooks/useSiteMetadata';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import ToTop from '@/components/Totop';
import Sidebar from '@/components/Sidebar';
import useScroll from '@/hooks/useScroll';

interface Props extends PageRendererProps {}

const BasicLayout: FunctionComponent<Props> = ({ location, children }) => {
  const data = useSiteMetadata();

  const [headerBgVisible, setHeaderBgVisible] = useState(true);
  const scroll = useScroll();

  const siteMetadata = data.site?.siteMetadata || { title: 'Title', description: '' };
  const isHomePage = location.pathname == '/';
  useEffect(() => {
    setHeaderBgVisible((scroll.top > 20 && isHomePage) || !isHomePage);
  }, [scroll]);
  return (
    <div className="dark:bg-coffee">
      <Helmet htmlAttributes={{ class: 'theme-dark' }} />
      <Header siteMetadata={siteMetadata} location={location} backgroundShow={headerBgVisible} />
      <ToTop />
      <div style={{ height: '200vh' }}></div>
      {/* <main className="flex">
        <div className="w-8/12 pt-10 pr-5">{children}</div>
        <Sidebar />
      </main>

      <Footer siteMetadata={siteMetadata}></Footer> */}
    </div>
  );
};

export default BasicLayout;
