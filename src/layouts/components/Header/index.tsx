import React from 'react';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';
import { FaHome, FaInfo, FaSun, FaBars, FaBookOpen } from 'react-icons/fa';
import classNames from 'classnames';
import NavItem from './NavItem';

interface Props {
  location: WindowLocation;
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
  backgroundShow: boolean;
  showBlock: boolean;
}

const defaultProps: Partial<Props> = {
  backgroundShow: true,
  showBlock: true
};

const Header: React.FC<Props> = ({
  siteMetadata,
  backgroundShow = defaultProps.backgroundShow,
  showBlock = defaultProps.showBlock
}) => {
  const title = siteMetadata.title;

  const navList = [
    { path: '/', title: '首页', icon: FaHome },
    { path: '/articles', title: '文章', icon: FaBookOpen },
    { path: '/about', title: '关于', icon: FaInfo }
  ];

  return (
    <header id="header">
      <div></div>
      <div style={{ zIndex: 1000 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" id="brand" className="navbar-brand">
              <div
                style={{ width: 42, height: 42, marginRight: 8, verticalAlign: 'middle', display: 'inline-block' }}
              />
              {title}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FaBars />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {navList.map((item, index) => (
                  <NavItem title={item.title} icon={item.icon} to={item.path} />
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.defaultProps = defaultProps;

export default Header;
