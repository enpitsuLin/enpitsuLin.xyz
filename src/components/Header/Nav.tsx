import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from 'react';
import { WindowLocation } from '@reach/router';
import NavItem from './NavItem';

interface NavItem {
  path: string;
  title: string;
}

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  navList: NavItem[];
  location: WindowLocation;
}

const Nav: FunctionComponent<Props> = props => {
  const { navList, location } = props;
  const isCurrent = (path: string) =>
    path === location.pathname || (location.pathname.startsWith('/post/') && path == '/');

  return (
    <nav id="site-nav" className="clearfix absolute right-0 p-0" style={{ bottom: -1 }}>
      {navList.map((item, index) => {
        const current = isCurrent(item.path);
        return <NavItem key={index} to={item.path} current={current} title={item.title} />;
      })}
    </nav>
  );
};

export default Nav;
