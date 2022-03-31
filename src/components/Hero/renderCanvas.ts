import { useEffect } from 'react'
import { Oscillator } from './Oscillator'
import { settings } from './settings'
import { Tendril } from './Tendril'

const hue = new Oscillator({
  phase: Math.random() * Math.PI * 2,
  amplitude: 85,
  frequency: 0.0015,
  offset: 285,
})

function onMousemove(e: MouseEvent) {
  function reset() {
    tendrils = Array.from({ length: settings.trails }).map(
      (_, i) =>
        new Tendril({
          spring: 0.45 + 0.025 * (i / settings.trails),
        })
    )
  }
  function mousemove(event: MouseEvent) {
    pos.x = event.clientX
    pos.y = event.clientY
    event.preventDefault()
  }

  document.removeEventListener('mousemove', onMousemove)
  document.addEventListener('mousemove', mousemove)
  mousemove(e)
  reset()
  render()
}
function render() {
  if (ctx.running) {
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.globalCompositeOperation = 'lighter'
    ctx.strokeStyle = `hsla(${Math.round(hue.update())},90%,50%,0.25)`
    ctx.lineWidth = 1
    for (let e, t = 0; t < settings.trails; t++) {
      ;(e = tendrils[t]).update(pos)
      e.draw(ctx)
    }
    requestAnimationFrame(render)
  }
}
function resizeCanvas() {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
}
let ctx: CanvasRenderingContext2D & { running?: boolean },
  pos = { x: 0, y: 0 },
  tendrils: Tendril[] = []

function renderCanvas() {
  const element = document.getElementById('canvas') as HTMLCanvasElement
  ctx = element.getContext('2d')
  ctx.running = true
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('touchstart', onMousemove)
  document.body.addEventListener('orientationchange', resizeCanvas)
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('focus', () => {
    if (!ctx.running) {
      ctx.running = true
      render()
    }
  })
  window.addEventListener('blur', () => {
    ctx.running = true
  })
  resizeCanvas()
}

export function useRenderCanvas() {
  useEffect(() => {
    renderCanvas()
  }, [])
}
