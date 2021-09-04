import React, { FunctionComponent } from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';

interface Props extends GatsbyLinkProps<any> {
  current?: boolean;
  title: string;
}
const defaultCls = 'inline-block px-5 py-1 ';

const NavItem: FunctionComponent<Props> = props => {
  const { title, to, current } = props;
  /** 不使用`Link`的`activeClassName` 在使用`tailwindcss`情况下 达不到我想要的效果 */
  const navItemCls = current ? defaultCls + 'border border-b-white' : defaultCls + 'border-b hover:border-gray-900';
  return (
    <Link to={to} className={navItemCls}>
      <span className="text-gray-700 text-sm leading-7">{title}</span>
    </Link>
  );
};

NavItem.defaultProps = {
  current: false
};
export default NavItem;
