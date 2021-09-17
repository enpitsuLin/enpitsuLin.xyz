import React, { FunctionComponent, useRef } from 'react';
import useCanvasNest from './hooks';
import { hex2rgba } from './utils';

interface Props {
  options?: {
    /** 线段密度 */
    density?: number;
    /** 线段颜色 允许HEX和RGB/RGBA格式 */
    color?: string;
    /** 鼠标是否触发吸附 */
    follow?: boolean;
  };
}

const CanvasNestComponent: FunctionComponent<Props> = ({ children, options }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const density = options?.density || 150;
  const color = options?.color ? hex2rgba(options?.color) : 'rgba(0,0,0)';

  useCanvasNest(canvasRef, color, density);

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
