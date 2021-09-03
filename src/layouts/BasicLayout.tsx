import React, { FunctionComponent } from 'react';
import { PageRendererProps } from 'gatsby';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';

import useSiteMetadata from '@/hooks/useSiteMetadata';

import '@/styles/themes/maupassant/index.scss';

interface Props extends PageRendererProps {}

const BasicLayout: FunctionComponent<Props> = ({ location, children }) => {
  const data = useSiteMetadata();
  const siteMetadata = data.site?.siteMetadata || { title: 'Title', description: '' };
  return (
    <div className="body-container">
      <Header siteMetadata={siteMetadata} location={location} />
      <Container>{children}</Container>
      <Footer siteMetadata={siteMetadata}></Footer>
    </div>
  );
};

export default BasicLayout;
