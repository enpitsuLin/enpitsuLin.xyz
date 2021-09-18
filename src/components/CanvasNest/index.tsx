import React, { FunctionComponent, useRef } from 'react';
import useCanvasNest, { CanvasNestOption } from './hooks';

interface Props {
  options?: CanvasNestOption;
}

const CanvasNestComponent: FunctionComponent<Props> = ({ children, options }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasNest(canvasRef, options);

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: -1 }}
      ></canvas>
      {children}
    </div>
  );
};

export default CanvasNestComponent;
