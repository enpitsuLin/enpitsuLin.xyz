import React from 'react';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';
import { FaHome, FaInfo, FaSun, FaBars, FaBookOpen } from 'react-icons/fa';
import classNames from 'classnames';
import NavItem from './NavItem';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Navbar expand="md" className="dark:bg-skobeloff">
          <Container className="">
            <Navbar.Brand href="#home">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <FaBars />
            </Navbar.Toggle>

            <Navbar.Collapse className="justify-end">
              <div>
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

Header.defaultProps = defaultProps;

export default Header;
