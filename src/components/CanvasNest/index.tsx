import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { NestPoint, randomPoints } from './utils';
import { useMouse } from 'ahooks';
interface Prop {
  config?: {
    color?: string;
    count?: number;
    opacity?: number;
  };
}

const CanvasNest: FunctionComponent<Prop> = ({ config }) => {
  const count = config?.count || 100;
  const color = config?.color || 'rbg(0,0,0)';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [points, setPoints] = useState<NestPoint[]>([]);
  function drawCanvas(el) {
    if (!context) return;
    const { offsetWidth: width, offsetHeight: height } = el;
    context.clearRect(0, 0, width, height);
    let e, i, d, x_dist, y_dist, dist;
    points.forEach((r, idx) => {
      r.x += r.xa;
      r.y += r.ya;
      r.xa *= r.x > width || r.x < 0 ? -1 : 1;
      r.ya *= r.x > height || r.y < 0 ? -1 : 1;
      context.fillStyle = color;
      context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1);
      for (i = idx + 1; i < points.length; i++) {
        e = points[i];
        if (null !== e.x && null !== e.y) {
        }
      }
    });
  }
  useEffect(() => {
    if (!canvasRef.current) return;
    const el = canvasRef.current;
    setContext(el.getContext('2d') as CanvasRenderingContext2D);
    setPoints(randomPoints(count, el.offsetWidth, el.offsetHeight));
    drawCanvas();
    return () => {};
  }, []);
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasNest;
