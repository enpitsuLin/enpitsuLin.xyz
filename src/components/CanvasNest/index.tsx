import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Box, BoxProps, useColorMode, useColorModeValue } from '@chakra-ui/react';
import CanvasNest from 'canvas-nest.js';

const CanvasNestComponent: FunctionComponent<BoxProps> = ({ children, ...props }) => {
  const canvasColor = useColorModeValue('0,0,0', '255,255,255');
  const { colorMode } = useColorMode();
  const canvasWrap = useRef<HTMLDivElement>(null);
  const [cn, setCn] = useState<CanvasNest>();
  useEffect(() => {
    const elm = canvasWrap.current;
    if (!elm) return;
    setCn(new CanvasNest(elm, { color: canvasColor }));
    return () => {
      cn && cn.destroy();
    };
  }, [colorMode]);
  return (
    <Box {...props} h="100vh" ref={canvasWrap}>
      {children}
    </Box>
  );
};

export default CanvasNestComponent;
