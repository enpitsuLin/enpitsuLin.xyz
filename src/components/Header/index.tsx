import React from 'react';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';
import { FaHome, FaInfo, FaSun, FaBars, FaBookOpen } from 'react-icons/fa';
import classNames from 'classnames';
import NavItem from './NavItem';

const linkNoUnderLine = 'hover:no-underline no-underline';

interface Props {
  location: WindowLocation;
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
  backgroundShow?: boolean;
  showBlock?: boolean;
}

const Header: React.FC<Props> = ({ location, siteMetadata, backgroundShow, showBlock }) => {
  const { title } = siteMetadata;

  const navList = [
    { path: '/', title: '首页', icon: FaHome },
    { path: '/articles', title: '文章', icon: FaBookOpen },
    { path: '/about', title: '关于', icon: FaInfo }
  ];

  return (
    <header id="header" className={classNames('block')}>
      <div className={classNames(showBlock && 'h-14')}></div>
      <div
        className={classNames('fixed left-0 right-0 top-0', backgroundShow ? 'dark:bg-skobeloff' : 'bg-transparent')}
        style={{ zIndex: 1000 }}
      >
        <nav className={classNames('flex items-center', 'max-w-7xl mx-auto relative px-2 h-14')}>
          <Link
            to="/"
            id="brand"
            className={classNames(linkNoUnderLine, 'inline-block text-white text-lg whitespace-nowrap')}
            style={{ overflowWrap: 'break-word' }}
          >
            <div
              style={{ width: 42, height: 42, marginRight: 8, verticalAlign: 'middle', display: 'inline-block' }}
            ></div>
            {title}
          </Link>
          <button
            className={classNames(
              'block sm:hidden',
              'ml-auto',
              'px-5 py-2 mx-1',
              'transition-all',
              'border border-white border-opacity-50 rounded hover:bg-primary-100',
              'text-white'
            )}
          >
            <FaBars />
          </button>
          <div className="absolute right-0 hidden items-center sm:flex">
            {navList.map((item, index) => (
              <NavItem key={index} title={item.title} icon={item.icon} to={item.path} />
            ))}
            <button
              className={classNames(
                'px-4 py-1',
                'transition-all',
                'bg-gray-700 rounded hover:bg-gray-600',
                'text-white'
              )}
            >
              <FaSun />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.defaultProps = {
  backgroundShow: true,
  showBlock: true
};

export default Header;
