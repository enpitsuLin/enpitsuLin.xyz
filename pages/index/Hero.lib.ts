import { useEffect, useRef, useState } from 'react';
export interface OScillatorOption {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
}
/**
 * 色相振荡器
 */
export class Oscillator implements OScillatorOption {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  value?: number;
  constructor({ phase = 0, offset = 0, frequency = 0.001, amplitude = 1 }: OScillatorOption) {
    this.phase = phase;
    this.offset = offset;
    this.frequency = frequency;
    this.amplitude = amplitude;
  }
  update() {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }
}

export const settings = { friction: 0.5, trails: 20, size: 50, dampening: 0.25, tension: 0.98 };

export interface TendrilOption {
  spring: number;
}

/**
 * 卷线节点
 */
class TendrilNode {
  x = 0;
  y = 0;
  vy = 0;
  vx = 0;
}
/**
 * 卷线
 */
export class Tendril implements TendrilOption {
  spring: number;
  friction: number;
  nodes: TendrilNode[];
  constructor(options: TendrilOption) {
    this.spring = options.spring + Math.random() * 0.1 - 0.05;
    this.friction = settings.friction + Math.random() * 0.01 - 0.005;
    this.nodes = [];
    Array.from({ length: settings.size }).forEach(() => {
      const node = new TendrilNode();
      this.nodes.push(node);
    });
  }
  public update(target: MousePos) {
    let spring = this.spring,
      node = this.nodes[0];

    node.vx += (target.x! - node.x) * spring;
    node.vy += (target.y! - node.y) * spring;

    for (let prev: TendrilNode, i = 0, n = this.nodes.length; i < n; i++) {
      node = this.nodes[i];

      if (i > 0) {
        prev = this.nodes[i - 1];

        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * settings.dampening;
        node.vy += prev.vy * settings.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;

      spring *= settings.tension;
    }
  }
  public draw(ctx: CanvasRenderingContext2D) {
    let x = this.nodes[0].x,
      y = this.nodes[0].y,
      a: TendrilNode,
      b: TendrilNode;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 1; i < this.nodes.length - 2; i++) {
      a = this.nodes[i];
      b = this.nodes[i + 1];
      x = (a.x + b.x) * 0.5;
      y = (a.y + b.y) * 0.5;

      ctx.quadraticCurveTo(a.x, a.y, x, y);
    }

    a = this.nodes[this.nodes.length - 2];
    b = this.nodes[this.nodes.length - 1];

    ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
    ctx.stroke();
    ctx.closePath();
  }
}

const hue = new Oscillator({
  phase: Math.random() * Math.PI * 2,
  amplitude: 85,
  frequency: 0.0015,
  offset: 285
});

let tendrils: Tendril[] = [];

interface MousePos {
  x: number | null;
  y: number | null;
}

function reset() {
  tendrils = Array.from({ length: settings.trails }).map(
    (_, i) =>
      new Tendril({
        spring: 0.45 + 0.025 * (i / settings.trails)
      })
  );
}
function useMouse(target: React.RefObject<HTMLElement>) {
  const mouseCoordinate = useRef<MousePos>({ x: null, y: null });
  const [targetEl, setTargetEl] = useState<HTMLElement>();
  useEffect(() => {
    if (!target.current) return;
    setTargetEl(target.current);
    target.current.addEventListener('mousemove', onMouseMove);
    return () => {
      targetEl && targetEl.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return mouseCoordinate;

  function onMouseMove(e: MouseEvent) {
    const { offsetX: x, offsetY: y } = e;
    mouseCoordinate.current = { x, y };
  }
}

export function useRenderHero(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const mouse = useMouse(canvasRef);
  const [context, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const raf = useRef<number>();

  function initCanvas() {
    if (typeof window == 'undefined' || !canvasRef.current) return;
    const { offsetHeight: height, offsetWidth: width } = canvasRef.current;
    setCtx(canvasRef.current.getContext('2d'));
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    reset();
  }
  function loop() {
    if (!context) return;
    const { offsetWidth: width, offsetHeight: height } = context.canvas;
    context.globalCompositeOperation = 'source-over';
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';
    context.strokeStyle = `hsla(${Math.round(hue.update())},90%,50%,0.25)`;
    context.lineWidth = 1;
    for (let e: Tendril, t = 0; t < settings.trails; t++) {
      (e = tendrils[t]).update(mouse.current);
      e.draw(context);
    }
    raf.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    initCanvas();
    document.body.addEventListener('orientationchange', initCanvas);
    window.addEventListener('resize', initCanvas);
    return () => {
      document.body.removeEventListener('orientationchange', initCanvas);
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(loop);
    return () => {
      raf.current && cancelAnimationFrame(raf.current);
    };
  }, [context]);
}
