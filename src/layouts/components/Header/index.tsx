import React from 'react';
import { WindowLocation } from '@reach/router';
import { FaHome, FaInfo, FaSun, FaBookOpen, FaComment } from 'react-icons/fa';
import classNames from 'classnames';
import NavLink from './Nav/NavLink';
import './style.css';
import Brand from './Nav/NavBrand';
import NavButton from './Nav/NavButton';

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
      <div className={classNames(!isRootPath && 'h-14 dark:bg-skobeloff')}></div>
      <div
        className={classNames(
          'fixed left-0 right-0 top-0',
          isRootPath && 'transition-background-color duration-300',
          isRootPath && headerTransparent ? 'bg-transparent' : 'dark:bg-skobeloff'
        )}
        style={{ zIndex: 1000 }}
      >
        <nav className={classNames('flex items-center', 'max-w-7xl mx-auto relative px-2 h-14')}>
          <Brand title={title as string} logo={<div className="w-10 h-10 inline-block mr-2 align-middle" />} />
          <NavButton navList={navList} />
          <div className="absolute right-0 hidden h-full items-center sm:flex">
            {navList.map((item, index) => (
              <NavLink key={index} title={item.title} icon={item.icon} to={item.path} />
            ))}
            <button
              className={classNames(
                'px-4 py-1',
                'transition-all',
                'bg-gray-700 rounded hover:bg-gray-600',
                'text-white',
                'cursor-not-allowed'
              )}
              title="暂时未开发XD"
            >
              <FaSun />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
