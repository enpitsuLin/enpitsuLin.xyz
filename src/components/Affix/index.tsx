import React, { FunctionComponent, HtmlHTMLAttributes, useRef } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

const Sticky = styled.div`
  position: sticky;
`;

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  offsetTop: number | string;
  target?: HTMLElement;
}

const defaultProps: Props = {
  offsetTop: 0
};

const Affix: FunctionComponent<Props> = ({ offsetTop = defaultProps.offsetTop, target, ...attrs }) => {
  const affixWrap = useRef<HTMLDivElement>(null);
  const affix = useRef<HTMLDivElement>(null);

  return (
    <Sticky {...attrs} className={classNames(attrs.className, 'affix-wrap')} style={{ top: offsetTop }} ref={affixWrap}>
      <div ref={affix} style={{ width: affixWrap.current?.offsetWidth }}>
        {attrs.children}
      </div>
    </Sticky>
  );
};

Affix.defaultProps = defaultProps;

export default Affix;
