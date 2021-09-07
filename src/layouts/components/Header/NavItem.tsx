import React, { FunctionComponent } from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';
import classNames from 'classnames';
import { IconType } from 'react-icons';

interface Props extends GatsbyLinkProps<any> {
  title: string;
  icon?: IconType;
}

const NavItem: FunctionComponent<Props> = props => {
  const { title, to } = props;
  return (
    <Link
      className={classNames('inline-flex items-center px-1 mx-1 h-full', 'text-white')}
      activeClassName="text-secondary"
      to={to}
    >
      {props.icon && <props.icon size={16} className="my-auto" />}
      <span className="mx-1">{title}</span>
    </Link>
  );
};

export default NavItem;
