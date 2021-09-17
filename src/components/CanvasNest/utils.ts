export interface NestPoint {
  x: number;
  y: number;
  xa: number;
  ya: number;
  max: number;
}

export function randomPoints(count, width, height): NestPoint[] {
  return range(count).map(function () {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      xa: 2 * Math.random() - 1, // 随机运动返现
      ya: 2 * Math.random() - 1,
      max: 6000 // 沾附距离
    };
  });
}

function range(n) {
  return Array(n)
    .fill(0)
    .map((e, idx) => idx);
}
