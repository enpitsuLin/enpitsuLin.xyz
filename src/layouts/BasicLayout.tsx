import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';

import useSiteMetadata from '@/hooks/useSiteMetadata';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import ToTop from '@/components/Totop';
import Sidebar from '@/components/Sidebar';

interface Props extends PageRendererProps {}

const BasicLayout: FunctionComponent<Props> = ({ location, children }) => {
  const data = useSiteMetadata();
  const siteMetadata = data.site?.siteMetadata || { title: 'Title', description: '' };
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-screen-lg px-6">
      <Header siteMetadata={siteMetadata} location={location} />
      <ToTop />
      <main className="flex">
        <div className="w-8/12 pt-10 pr-5">{children}</div>
        <Sidebar />
      </main>

      <Footer siteMetadata={siteMetadata}></Footer>
    </div>
  );
};

export default BasicLayout;
