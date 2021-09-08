import type { IconType } from 'react-icons';
import React, { FunctionComponent } from 'react';
import NavLink from './NavLink';

interface Props {
  navList: { path: string; title: string; icon: IconType | any }[];
}

const NavList: FunctionComponent<Props> = ({ navList }) => {
  return (
    <ul className="flex flex-col md:flex-row ml-auto">
      {navList.map((item, index) => (
        <li key={index} className="nav-link">
          <NavLink title={item.title} icon={item.icon} to={item.path}></NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
