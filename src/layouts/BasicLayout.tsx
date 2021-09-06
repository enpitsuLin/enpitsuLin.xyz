import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { PageRendererProps } from 'gatsby';
import classNames from 'classnames';

import useSiteMetadata from '@/hooks/useSiteMetadata';
import useScroll from '@/hooks/useScroll';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToTop from '@/components/Totop';

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
    <div className={classNames('dark:bg-trueGray-850 dark:text-white', 'flex flex-col', 'min-h-screen', 'break-words')}>
      <Helmet htmlAttributes={{ class: 'theme-dark' }} />
      <Header
        siteMetadata={siteMetadata}
        location={location}
        backgroundShow={headerBgVisible}
        showBlock={!isHomePage}
      />
      <ToTop />
      <main className={classNames('flex-1', 'min-h-screen')}>
        <div className="h-full">{children}</div>
      </main>

      <Footer siteMetadata={siteMetadata}></Footer>
    </div>
  );
};

export default BasicLayout;
