import React from 'react';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';
import Nav from './Nav';

interface Props {
  location: WindowLocation;
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
}

const Header: React.FC<Props> = ({ location, siteMetadata }) => {
  const { title, description } = siteMetadata;

  const navList = [
    { path: '/', title: '首页' },
    { path: '/about', title: '关于' }
  ];
  return (
    <header id="header" className="pt-14 relative border-black border-b" style={{ color: '#ddd' }}>
      <div className="pb-11">
        <div className="col-group">
          <div className="site-name">
            <Link id="logo" to="/" className="text-4xl text-gray-600 font-bold">
              {title}
            </Link>
            <p className="mt-1 text-gray-400 text-sm">{description || ''}</p>
          </div>

          <Nav navList={navList} location={location}></Nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
