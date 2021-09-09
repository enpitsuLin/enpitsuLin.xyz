import React, { FunctionComponent } from 'react';
import './style.css';

interface Props {
  /** @todo use props control animate's prototypes */
}

const AnimatedContent: FunctionComponent<Props> = props => {
  return <div className="animated-content animate">{props.children}</div>;
};

export default AnimatedContent;
