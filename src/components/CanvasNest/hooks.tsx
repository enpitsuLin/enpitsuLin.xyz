import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { NestPoint, randomPoints, lowerAlpha } from './utils';

/** 在canvas上画点 */
function drawPoint(context: CanvasRenderingContext2D, point: NestPoint, color: string) {
  if (!point.x || !point.y) return;
  context.fillStyle = color;
  context.fillRect(point.x - 0.5, point.y - 0.5, 1, 1);
}

/** 在canvas上画线 */
function drawLine(
  context: CanvasRenderingContext2D,
  pointStart: NestPoint,
  pointEnd: NestPoint,
  color: string,
  lineWidth: number
) {
  if (!pointEnd.x || !pointEnd.y || !pointStart.x || !pointStart.y) return;
  context.beginPath();
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.moveTo(pointStart.x, pointStart.y);
  context.lineTo(pointEnd.x, pointEnd.y);
  context.stroke();
}

/**
 * 在指定Canvas元素上渲染巢状图
 * @param targetRef 渲染目标HTMlCanvasElement 的 ref
 * @param color 颜色
 * @param density 密度
 */
export default function useCanvasNest(
  targetRef: RefObject<HTMLCanvasElement>,
  color: string,
  density: number,
  follow = true
) {
  const [points, setPoints] = useState<NestPoint[]>([]);

  const mouseCoordinate = useRef<NestPoint>({ x: null, y: null, my: 0, mx: 0, max: 6000, isMouse: true });
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [raf, setRaf] = useState<number>();

  function onMouseMove(e: MouseEvent) {
    const { offsetX, offsetY } = e;
    mouseCoordinate.current = { x: offsetX, y: offsetY, my: 0, mx: 0, max: 6000, isMouse: true };
  }
  function onMouseOut(e: MouseEvent) {
    mouseCoordinate.current = { x: null, y: null, my: 0, mx: 0, max: 6000, isMouse: true };
  }

  const drawCanvasNest = () => {
    if (!context) return;
    const { offsetWidth: width, offsetHeight: height } = context.canvas;
    context.clearRect(0, 0, width, height);
    const pointsWithMouse = points.concat(mouseCoordinate.current);
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
          if (nextPoint.isMouse && dist >= nextPoint.max / 2) {
            point.x -= 0.03 * x_dist;
            point.y -= 0.03 * y_dist;
          }
          const d = (nextPoint.max - dist) / nextPoint.max;
          drawLine(context, point, nextPoint, lowerAlpha(color, 0.6), d / 2);
        }
      }
    }

    setRaf(requestAnimationFrame(drawCanvasNest));
  };
  useEffect(() => {
    if (typeof window == 'undefined' || !targetRef.current) return;
    const { offsetHeight: height, offsetWidth: width } = targetRef.current;
    setContext(targetRef.current.getContext('2d') as CanvasRenderingContext2D);
    setPoints(randomPoints(density, width, height));

    targetRef.current.width = width;
    targetRef.current.height = height;
  }, []);

  useEffect(() => {
    const canvasWrapper = targetRef.current?.parentElement as HTMLElement;
    canvasWrapper.addEventListener('mousemove', onMouseMove);
    canvasWrapper.addEventListener('mouseout', onMouseOut);
    requestAnimationFrame(drawCanvasNest);
    return () => {
      canvasWrapper.removeEventListener('mousemove', onMouseMove);
      canvasWrapper.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf as number);
    };
  }, [context]);
}
