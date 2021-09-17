export interface NestPoint {
  /** 该点当前x坐标 */
  x: number;
  /** 该点当前y坐标 */
  y: number;
  /** 该点当前x坐标运动趋势 */
  mx: number;
  /** 该点当前y坐标运动趋势 */
  my: number;
  /** 吸附距离 */
  max: number;
}

export function randomPoints(count, width, height): NestPoint[] {
  return range(count).map(function () {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      mx: 2 * Math.random() - 1, // 随机运动返现
      my: 2 * Math.random() - 1,
      max: 6000 // 沾附距离
    };
  });
}

function range(n) {
  // prettier-ignore
  return Array(n).fill(0).map((_, idx) => idx);
}
