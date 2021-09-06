import React, { FunctionComponent, HTMLAttributeAnchorTarget } from 'react';
import classNames from 'classnames';

interface Props {
  links: { name: string; link: string }[];
  target?: HTMLAttributeAnchorTarget;
}

const LinkList: FunctionComponent<Props> = ({ links, target }) => {
  return (
    <ul className="flex">
      {links.map((link, i) => (
        <li key={i} className={classNames('mr-2')}>
          <a href={link.link} target={target} className="text-primary-400 hover:underline">
            {link.name}
          </a>
          <span className={classNames('ml-2', i >= links.length - 1 && 'hidden')}>|</span>
        </li>
      ))}
    </ul>
  );
};
LinkList.defaultProps = {
  target: '_blank'
};

export default LinkList;
