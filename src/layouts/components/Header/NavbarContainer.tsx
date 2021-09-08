import classNames from 'classnames';
import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  transparent: boolean;
}

const NavbarContainer: FunctionComponent<Props> = ({ transparent, className, children }) => {
  return (
    <div
      className={classNames(
        className,
        'transition-background-color duration-200 ease-in-out',
        transparent ? 'bg-transparent' : 'dark:bg-skobeloff'
      )}
    >
      {children}
    </div>
  );
};

export default NavbarContainer;
