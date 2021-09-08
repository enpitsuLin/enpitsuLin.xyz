import classNames from 'classnames';
import { Link } from 'gatsby';
import React, { FunctionComponent, ReactElement } from 'react';


interface Props {
  title: string;
  logo: ReactElement;
}

const Brand: FunctionComponent<Props> = ({ title, logo }) => {
  return (
    <Link
      to="/"
      id="brand"
      className={classNames('inline-block text-white text-lg whitespace-nowrap')}
      style={{ overflowWrap: 'break-word' }}
    >
      {logo}
      {title}
    </Link>
  );
};

export default Brand;
