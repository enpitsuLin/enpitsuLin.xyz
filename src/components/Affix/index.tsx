import React, { FunctionComponent, useRef } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
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
    <Box
      position="sticky"
      className={classNames(attrs.className, 'affix-wrap')}
      style={{ top: offsetTop }}
      ref={affixWrap}
      {...attrs}
    >
      <div ref={affix} style={{ width: affixWrap.current?.offsetWidth }}>
        {attrs.children}
      </div>
    </Box>
  );
};

Affix.defaultProps = defaultProps;

export default Affix;
