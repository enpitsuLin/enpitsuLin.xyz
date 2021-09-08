import React, { FunctionComponent, useState } from 'react';
import { WindowLocation } from '@reach/router';
import { FaHome, FaInfo, FaSun, FaBars, FaBookOpen } from 'react-icons/fa';
import Navbar from 'react-bootstrap/Navbar';
import classNames from 'classnames';
import NavItem from './NavItem';
import Placeholder from './HeaderPlaceholder';
import NavbarContainer from './NavbarContainer';
// import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  location: WindowLocation;
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
  headerTransparent: boolean;
}

const Header: FunctionComponent<Props> = ({ siteMetadata, headerTransparent }) => {
  const [isOpen, setOpen] = useState(false);
  const title = siteMetadata.title;

  const navList = [
    { path: '/', title: '首页', icon: FaHome },
    { path: '/articles', title: '文章', icon: FaBookOpen },
    { path: '/about', title: '关于', icon: FaInfo }
  ];

  return (
    <header id="header">
      <Placeholder isOpen={isOpen} transparent={headerTransparent} />
      <NavbarContainer transparent={headerTransparent} className="fixed left-0 right-0 top-0 z-50">
        <Navbar
          expand="md"
          className={classNames(
            'max-w-7xl mx-auto px-2 py-1 relative',
            'transition-width duration-200 ease-in-out',
            'flex items-center flex-wrap justify-between '
          )}
        >
          <Navbar.Brand href="/" className="py-1">
            <div style={{ width: 42, height: 42, marginRight: 8, verticalAlign: 'middle', display: 'inline-block' }} />
            {title}
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="block md:hidden"
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Collapse
            className={classNames('flex-1 md:flex-auto flex-grow flex-shrink', isOpen ? 'block' : 'hidden', 'md:flex ')}
          >
            <div className="flex ml-auto">
              {navList.map(item => (
                <NavItem title={item.title} icon={item.icon} to={item.path} />
              ))}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </NavbarContainer>
    </header>
  );
};

export default Header;
