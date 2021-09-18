export interface NestPoint {
  /** 该点当前x坐标 */
  x: number | null;
  /** 该点当前y坐标 */
  y: number | null;
  /** 该点当前x坐标运动趋势 */
  mx: number;
  /** 该点当前y坐标运动趋势 */
  my: number;
  /** 吸附距离 */
  max: number;
}

/** 在画布上画点 */
export function drawPoint(context: CanvasRenderingContext2D, point: NestPoint, color: string, radius = 1) {
  if (!point.x || !point.y) return;
  context.beginPath();
  context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

/** 在画布上画线 */
export function drawLine(
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
/** 是否处于画布中 */
export function inCanvas(context: CanvasRenderingContext2D, point: NestPoint) {
  const { height, width } = context.canvas;
  return point.x && point.y && point.x > 0 && point.x < width && point.y > 0 && point.y < height;
}
/**
 * 生成随机的点位
 * @param count 数量
 * @param width 宽度
 * @param height 长度
 * @returns 点位数组
 */
export function randomPoints(count, width, height, maxDist = 6000): NestPoint[] {
  return range(count).map(function () {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      mx: 2 * Math.random() - 1, // 随机运动返现
      my: 2 * Math.random() - 1,
      max: maxDist // 吸附距离
    };
  });
}

function range(n) {
  // prettier-ignore
  return Array(n).fill(0).map((_, idx) => idx);
}

/**
 * 将hex色值转rgba色值
 * @param color 传入的hex色值 #12345678
 * @returns rgba色值
 */
export function hex2rgba(color: string) {
  if (color.includes('rgb')) return color;
  /** 缩写形式 */
  const isSort = color.length <= 5;
  /** 存在透明度部分 */
  const hasAlpha = color.length == 9 || color.length == 5;
  let alpha = 1;
  if (hasAlpha) {
    alpha = parseInt(`0x${isSort ? color[4] + color[4] : color.slice(7, 9)}`);
  }
  const red = parseInt(`0x${isSort ? color[1] + color[1] : color.slice(1, 3)}`);
  const green = parseInt(`0x${isSort ? color[2] + color[2] : color.slice(3, 5)}`);
  const blue = parseInt(`0x${isSort ? color[3] + color[3] : color.slice(5, 7)}`);

  return `rgba(${red},${green},${blue},${alpha})`;
}
/**
 * 降低颜色的alpha值
 * @param color 色值
 * @param low 小数 降低的值
 * @returns rgba色值
 */
export function lowerAlpha(color: string, low = 0.5) {
  if (!color.includes('rgb')) color = hex2rgba(color);
  const splitRGBA = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  const alpha = (parseInt(splitRGBA[3]) || 1) - low;
  return `rgba(${splitRGBA[0]},${splitRGBA[1]},${splitRGBA[2]},${alpha})`;
}
