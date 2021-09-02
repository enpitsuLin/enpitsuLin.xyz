import * as React from 'react';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';

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
    <header id="header" className="clearfix">
      <div className="container">
        <div className="col-group">
          <div className="site-name">
            <a id="logo" href="/">
              {title}
            </a>
            <p className="description">{description || ''}</p>
          </div>

          <nav id="nav-menu" className="clearfix">
            {navList.map((item, index) => {
              const isCurrentPage =
                location.pathname === item.path || (location.pathname.startsWith('/post/') && item.path == '/');
              return (
                <Link key={index} to={item.path} className={isCurrentPage ? 'current' : ''}>
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
