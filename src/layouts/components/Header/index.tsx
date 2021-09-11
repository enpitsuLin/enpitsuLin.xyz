import React from 'react';
import { WindowLocation } from '@reach/router';
import { FaHome, FaInfo, FaSun, FaBookOpen, FaComment } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import NavLink from './Nav/NavLink';
import Brand from './Nav/NavBrand';
import NavButton from './Nav/NavButton';
import styled from 'styled-components';

const HeaderPlaceHolder = styled.div<{ visible: boolean }>`
  ${props => (props.visible ? 'background-color:var(--skobeloff);height:3.5rem' : '')}
`;

const NavWrap = styled.div<{ isRootPath: boolean; transparent: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  ${props => (props.isRootPath ? 'transition:background-color .3s;' : '')}
  background:${props => (props.isRootPath && props.transparent ? '#0000' : 'var(--skobeloff)')};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
  position: relative;
  padding: 0 0.5rem;
  height: 3.5rem;
`;

const NavContainer = styled.div`
  position: absolute;
  right: 0;
  display: none;
  height: 100%;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

interface Props {
  location: WindowLocation;
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
  headerTransparent?: boolean;
}

const Header: React.FC<Props> = ({ location, siteMetadata, headerTransparent }) => {
  const { title } = siteMetadata;
  const isRootPath = location.pathname == '/';

  const navList = [
    { path: '/', title: '首页', icon: FaHome },
    { path: '/articles', title: '文章', icon: FaBookOpen },
    { path: '/comments', title: '留言', icon: FaComment },
    { path: '/about', title: '关于', icon: FaInfo }
  ];

  return (
    <header id="header" className={classNames('block')}>
      <HeaderPlaceHolder visible={!isRootPath} />
      <NavWrap isRootPath={isRootPath} transparent={headerTransparent} style={{ zIndex: 1000 }}>
        <Nav>
          <Brand title={title as string} logo={<div />} />
          <NavButton navList={navList} />
          <NavContainer>
            {navList.map((item, index) => (
              <NavLink key={index} title={item.title} icon={item.icon} to={item.path} />
            ))}
            <Button variant="secondary" title="暂时未开发XD">
              <FaSun />
            </Button>
          </NavContainer>
        </Nav>
      </NavWrap>
    </header>
  );
};

export default Header;
