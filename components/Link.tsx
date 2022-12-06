import React from 'react';
import { usePageContext } from '../hooks/usePageContext';

interface LinkProp extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export const Link: React.FC<LinkProp> = (props) => {
  const pageContext = usePageContext();
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ');
  return <a {...props} className={className} />;
};
