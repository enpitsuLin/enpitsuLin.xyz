import { settings } from './settings'

export interface TendrilOption {
  spring: number
}

/**
 * 卷线节点
 */
class TendrilNode {
  x = 0
  y = 0
  vy = 0
  vx = 0
}
/**
 * 卷线
 */
export class Tendril implements TendrilOption {
  spring: number
  friction: number
  nodes: TendrilNode[]
  constructor(options: TendrilOption) {
    this.spring = options.spring + Math.random() * 0.1 - 0.05
    this.friction = settings.friction + Math.random() * 0.01 - 0.005
    this.nodes = []
    Array.from({ length: settings.size }).forEach(() => {
      const node = new TendrilNode()
      this.nodes.push(node)
    })
  }
  public update(target: { x: number; y: number }) {
    let spring = this.spring,
      node = this.nodes[0]

    node.vx += (target.x - node.x) * spring
    node.vy += (target.y - node.y) * spring

    for (let prev: TendrilNode, i = 0, n = this.nodes.length; i < n; i++) {
      node = this.nodes[i]

      if (i > 0) {
        prev = this.nodes[i - 1]

        node.vx += (prev.x - node.x) * spring
        node.vy += (prev.y - node.y) * spring
        node.vx += prev.vx * settings.dampening
        node.vy += prev.vy * settings.dampening
      }

      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy

      spring *= settings.tension
    }
  }
  public draw(ctx: CanvasRenderingContext2D) {
    let x = this.nodes[0].x,
      y = this.nodes[0].y,
      a: TendrilNode,
      b: TendrilNode

    ctx.beginPath()
    ctx.moveTo(x, y)

    for (let i = 1; i < this.nodes.length - 2; i++) {
      a = this.nodes[i]
      b = this.nodes[i + 1]
      x = (a.x + b.x) * 0.5
      y = (a.y + b.y) * 0.5

      ctx.quadraticCurveTo(a.x, a.y, x, y)
    }

    a = this.nodes[this.nodes.length - 2]
    b = this.nodes[this.nodes.length - 1]

    ctx.quadraticCurveTo(a.x, a.y, b.x, b.y)
    ctx.stroke()
    ctx.closePath()
  }
}
