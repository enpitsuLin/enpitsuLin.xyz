import * as React from 'react';
import { WindowLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
      description: string;
    };
  };
}

interface Prop {
  location: WindowLocation;
}

const Layout: React.FC<Prop> = ({ location, children }) => {
  const data: SiteMetadata = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const siteMetadata = data.site.siteMetadata || { title: 'Title', description: '' };

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
