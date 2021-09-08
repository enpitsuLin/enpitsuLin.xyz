import React, { FunctionComponent, useState } from 'react';
import { WindowLocation } from '@reach/router';
import { FaHome, FaInfo, FaSun, FaBars, FaBookOpen } from 'react-icons/fa';
import { Navbar, Container } from 'react-bootstrap';
import classNames from 'classnames';
import NavItem from './NavItem';
import './style.css';
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
      <div className={classNames(isOpen && 'dark:bg-skobeloff h-96')}></div>
      <div>
        <Navbar
          expand="md"
          fixed="top"
          variant="dark"
          className={classNames(headerTransparent ? 'bg-transparent' : 'dark:bg-skobeloff')}
          onToggle={v => {
            setOpen(v);
          }}
        >
          <Container>
            <Navbar.Brand href="/">
              <div
                style={{ width: 42, height: 42, marginRight: 8, verticalAlign: 'middle', display: 'inline-block' }}
              />
              {title}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <FaBars />
            </Navbar.Toggle>
            <Navbar.Collapse className={classNames('flex-1 md:flex-auto flex-grow flex-shrink')}>
              <div className="flex ml-auto">
                {navList.map(item => (
                  <NavItem title={item.title} icon={item.icon} to={item.path} />
                ))}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
