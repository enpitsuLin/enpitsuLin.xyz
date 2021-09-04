import React from 'react';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';
import ClassNames from 'classnames';
import '@/styles/markdown/typora-theme-next/next-dark.css';
import useScroll from '@/hooks/useScroll';
const linkNoUnderLine = 'hover:no-underline no-underline';

interface Props {
  location: WindowLocation;
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
  backgroundShow?: boolean;
}

const Header: React.FC<Props> = ({ location, siteMetadata, backgroundShow }) => {
  const { title } = siteMetadata;

  const navList = [
    { path: '/', title: '首页' },
    { path: '/about', title: '关于' }
  ];
  return (
    <header
      id="header"
      className={ClassNames('fixed left-0 right-0', backgroundShow ? 'dark:bg-skobeloff' : 'bg-transparent')}
    >
      <nav className="flex items-center max-w-7xl mx-auto relative px-2 py-1">
        <Link
          to="/"
          id="brand"
          className={ClassNames(linkNoUnderLine, 'inline-block text-white text-lg whitespace-nowrap')}
          style={{ overflowWrap: 'break-word' }}
        >
          <div
            style={{ width: 42, height: 42, marginRight: 8, verticalAlign: 'middle', display: 'inline-block' }}
          ></div>
          {title}
        </Link>
        <button className="sm:visible md:invisible">+</button>
        <div className="absolute right-0">
          {navList.map((item, index) => (
            <Link
              key={index}
              className={ClassNames(linkNoUnderLine, 'text-white px-1', 'md:visible', 'sm:invisible')}
              activeClassName="text-primary-400"
              to={item.path}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  backgroundShow: true
};

export default Header;
