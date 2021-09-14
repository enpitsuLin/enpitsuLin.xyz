import React from 'react';
import { WindowLocation } from '@reach/router';
import { FaHome, FaInfo, FaSun, FaBookOpen, FaComment, FaMoon } from 'react-icons/fa';
import classNames from 'classnames';
import NavLink from './Nav/NavLink';
import Brand from './Nav/NavBrand';
import NavButton from './Nav/NavButton';
import styled from 'styled-components';
import Logo from '@/assets/images/logo.svg';
import { IconButton, useColorMode } from '@chakra-ui/react';

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

  position: relative;
  padding: 0 0.5rem;
  height: 3.5rem;
`;

const NavContainer = styled.div`
  margin-left: auto;
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
  const { colorMode, toggleColorMode } = useColorMode();
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
        <Nav className="container-xl">
          <Brand title={title as string} logo={<img src={Logo} style={{ height: 40, width: 40, marginRight: 5 }} />} />
          <NavButton navList={navList} />
          <NavContainer>
            {navList.map((item, index) => (
              <NavLink key={index} title={item.title} icon={item.icon} to={item.path} />
            ))}

            <IconButton
              aria-label="Theme"
              colorScheme="#0000"
              icon={colorMode == 'light' ? <FaMoon /> : <FaSun />}
              onClick={() => {
                toggleColorMode();
              }}
            />
          </NavContainer>
        </Nav>
      </NavWrap>
    </header>
  );
};

export default Header;
