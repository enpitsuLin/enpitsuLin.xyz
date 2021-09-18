import { Button } from '@chakra-ui/button';
import React, { FunctionComponent, useRef } from 'react';
import useCanvasNest, { CanvasNestOption } from './hooks';

interface Props {
  options?: CanvasNestOption;
}

const CanvasNestComponent: FunctionComponent<Props> = ({ children, options }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { updateCanvasNest } = useCanvasNest(canvasRef, options);

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: -1 }}
      ></canvas>
      <Button
        onClick={() => {
          updateCanvasNest();
        }}
      >
        刷新
      </Button>
      {children}
    </div>
  );
};

export default CanvasNestComponent;
