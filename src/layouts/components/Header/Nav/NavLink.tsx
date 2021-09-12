import React, { FunctionComponent } from 'react';
import { GatsbyLinkProps, Link } from 'gatsby';
import classNames from 'classnames';
import { IconType } from 'react-icons';
import styled from 'styled-components';

const LinkItem = styled(Link)`
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  color: #eee;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
  &.active {
    color: var(--secondary);
  }
  > span {
    margin: 0 0.5rem;
    height: 1rem;
    line-height: 1rem;
  }
`;

interface Props extends GatsbyLinkProps<any> {
  title: string;
  icon?: IconType;
}

const NavLink: FunctionComponent<Props> = props => {
  const { title, to, className, activeClassName } = props;
  return (
    <LinkItem className={className} activeClassName={classNames('active', activeClassName)} to={to}>
      {props.icon && <props.icon className="mr-1" />}
      <span>{title}</span>
    </LinkItem>
  );
};

export default NavLink;
