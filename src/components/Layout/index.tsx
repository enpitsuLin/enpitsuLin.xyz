import * as React from 'react';
import { WindowLocation } from '@reach/router';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';
import '../../styles/themes/maupassant/index.scss';
import useSiteMetadata from '../../hooks/useSiteMetadata';

interface Prop {
  location: WindowLocation;
}

const Layout: React.FC<Prop> = ({ location, children }) => {
  const data = useSiteMetadata();

  const siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata> = data.site?.siteMetadata || {
    title: 'Title',
    description: ''
  };

  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`;

  return (
    <div className="body-container" data-is-root-path={isRootPath}>
      <Header siteMetadata={siteMetadata} location={location} />
      <Container>{children}</Container>
      <Footer siteMetadata={siteMetadata} />
    </div>
  );
};

export default Layout;
