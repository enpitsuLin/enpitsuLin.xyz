import classNames from 'classnames';
import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  transparent: boolean;
}

const Placeholder: FunctionComponent<Props> = ({ isOpen, transparent, className }) => {
  return (
    <div
      className={classNames(
        className,
        isOpen ? 'h-24' : transparent ? 'h-0' : 'h-14',
        'md:transition-height md:duration-300 ease-in-out',
        transparent ? 'h-0' : 'md:h-14'
      )}
    />
  );
};

export default Placeholder;
