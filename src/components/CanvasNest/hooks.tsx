import { RefObject, useEffect, useRef, useState } from 'react';
import { NestPoint, randomPoints, lowerAlpha, drawLine, drawPoint, inCanvas } from './utils';

/**
 * Canvas配置属性
 */
export interface CanvasNestOption {
  /** 是否鼠标吸附跟随 默认是*/
  follow?: boolean;
  /** 线条密度 默认150*/
  density?: number;
  /** 颜色 -同时作用于线条颜色和线段端点颜色 默认rgb(0,0,0)*/
  color?: string;
  /** 线条填充颜色透明度 小数 0~1 默认0.4*/
  alpha?: number;
  /** 自动吸附的极限距离 默认6000*/
  maxDist?: number;
}

/**
 * 在指定Canvas元素上渲染巢状图
 * @param targetRef 渲染目标HTMlCanvasElement 的 ref
 * @param options 设置
 */
export default function useCanvasNest(targetRef: RefObject<HTMLCanvasElement>, options: CanvasNestOption) {
  const mouseCoordinate = useRef<NestPoint>({ x: null, y: null, my: 0, mx: 0, max: 6000 });
  const [points, setPoints] = useState<NestPoint[]>([]);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [raf, setRaf] = useState<number>();
  const { color = 'rgba(0,0,0)', density = 150, follow = true, alpha = 0.4, maxDist = 6000 } = options;

  function onMouseMove(e: MouseEvent) {
    const { offsetX, offsetY } = e;
    mouseCoordinate.current = { x: offsetX, y: offsetY, my: 0, mx: 0, max: 6000 };
  }

  const drawCanvasNest = () => {
    if (!context) return;
    const { offsetWidth: width, offsetHeight: height } = context.canvas;
    context.clearRect(0, 0, width, height);
    const pointsWithMouse = inCanvas(context, mouseCoordinate.current)
      ? points.concat(mouseCoordinate.current)
      : points;
    for (let idx = 0; idx < pointsWithMouse.length; idx++) {
      const point = pointsWithMouse[idx];

      if (!point.x || !point.y) return;
      point.x += point.mx;
      point.y += point.my;
      point.mx *= point.x > width || point.x < 0 ? -1 : 1;
      point.my *= point.y > height || point.y < 0 ? -1 : 1;
      drawPoint(context, point, color);

      for (let i = idx + 1; i < pointsWithMouse.length; i++) {
        const nextPoint = pointsWithMouse[i];
        if (!nextPoint.x || !nextPoint.y) return;
        const x_dist = point.x - nextPoint.x;
        const y_dist = point.y - nextPoint.y;
        const dist = x_dist * x_dist + y_dist * y_dist;
        /** 进入吸附距离 */
        if (dist < nextPoint.max) {
          /** 是鼠标点则靠近 */
          if (nextPoint == mouseCoordinate.current && dist >= nextPoint.max / 2 && follow) {
            point.x -= 0.03 * x_dist;
            point.y -= 0.03 * y_dist;
          }
          const d = (nextPoint.max - dist) / nextPoint.max;
          drawLine(context, point, nextPoint, lowerAlpha(color, 1 - alpha), d / 2);
        }
      }
    }

    setRaf(requestAnimationFrame(drawCanvasNest));
  };
  useEffect(() => {
    if (typeof window == 'undefined' || !targetRef.current) return;
    const { offsetHeight: height, offsetWidth: width } = targetRef.current;
    setContext(targetRef.current.getContext('2d') as CanvasRenderingContext2D);
    setPoints(randomPoints(density, width, height, maxDist));

    targetRef.current.width = width;
    targetRef.current.height = height;
  }, []);

  useEffect(() => {
    const canvasWrapper = targetRef.current?.parentElement as HTMLElement;
    canvasWrapper.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(drawCanvasNest);
    return () => {
      canvasWrapper.removeEventListener('mousemove', onMouseMove);
      raf && cancelAnimationFrame(raf);
    };
  }, [context, points]);
}
