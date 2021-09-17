import { RefObject, useCallback, useEffect } from 'react';
import { NestPoint, randomPoints } from './utils';

/** 在canvas上画点 */
function drawPoint(context: CanvasRenderingContext2D, point: NestPoint, color: string) {
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
export default function useCanvasNest(targetRef: RefObject<HTMLCanvasElement>, color: string, density: number) {
  const drawCanvas = useCallback(
    /** 在画布上绘制 */
    (context: CanvasRenderingContext2D, points: NestPoint[], width: number, height: number) => {
      context.clearRect(0, 0, width, height);
      points.forEach((point, idx) => {
        point.x += point.mx;
        point.x += point.my;
        point.mx *= point.x > width || point.x < 0 ? -1 : 1;
        point.my *= point.y > height || point.y < 0 ? -1 : 1;
        drawPoint(context, point, color);
        for (let i = idx + 1; i < points.length; i++) {
          const next_point = points[i];
          const x_dist = point.x - next_point.x;
          const y_dist = point.y - next_point.y;
          const dist = x_dist * x_dist + y_dist * y_dist;
          /** 进入吸附距离 */
          if (dist < next_point.max) {
            const d = (next_point.max - dist) / next_point.max;
            drawLine(context, point, next_point, 'rgba(0,0,0,0.5)', d / 2);
          }
        }
      });
      requestAnimationFrame(() => {
        drawCanvas(context, points, width, height);
      });
    },
    []
  );

  useEffect(() => {
    if (typeof window == 'undefined' || !targetRef.current) return;
    const { offsetHeight: height, offsetWidth: width } = targetRef.current;
    const context = targetRef.current.getContext('2d') as CanvasRenderingContext2D;
    const points = randomPoints(density, width, height);
    targetRef.current.width = width;
    targetRef.current.height = height;
    requestAnimationFrame(() => {
      drawCanvas(context, points, width, height);
    });
  }, []);
}
