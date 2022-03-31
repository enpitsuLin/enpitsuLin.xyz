import { useEffect, useRef, useState } from 'react'
import { Oscillator } from './Oscillator'
import { settings } from './settings'
import { Tendril } from './Tendril'

const hue = new Oscillator({
  phase: Math.random() * Math.PI * 2,
  amplitude: 85,
  frequency: 0.0015,
  offset: 285,
})

let tendrils: Tendril[] = []

interface MousePos {
  x: number | null
  y: number | null
}

function reset() {
  tendrils = Array.from({ length: settings.trails }).map(
    (_, i) =>
      new Tendril({
        spring: 0.45 + 0.025 * (i / settings.trails),
      })
  )
}
function useMouse(target: React.RefObject<HTMLElement>) {
  const mouseCoordinate = useRef<MousePos>({ x: null, y: null })
  const [targetEl, setTargetEl] = useState<HTMLElement>()
  useEffect(() => {
    setTargetEl(target.current)
    target.current.addEventListener('mousemove', onMouseMove)
    return () => {
      targetEl && targetEl.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return mouseCoordinate

  function onMouseMove(e: MouseEvent) {
    const { offsetX: x, offsetY: y } = e
    mouseCoordinate.current = { x, y }
  }
}

export function useRenderCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const mouse = useMouse(canvasRef)
  const [context, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const raf = useRef<number>()

  function initCanvas() {
    if (typeof window == 'undefined' || !canvasRef.current) return
    const { offsetHeight: height, offsetWidth: width } = canvasRef.current
    setCtx(canvasRef.current.getContext('2d'))
    canvasRef.current.width = width
    canvasRef.current.height = height
    reset()
  }
  function loop() {
    if (!context) return
    const { offsetWidth: width, offsetHeight: height } = context.canvas
    context.globalCompositeOperation = 'source-over'
    context.clearRect(0, 0, width, height)
    context.globalCompositeOperation = 'lighter'
    context.strokeStyle = `hsla(${Math.round(hue.update())},90%,50%,0.25)`
    context.lineWidth = 1
    for (let e: Tendril, t = 0; t < settings.trails; t++) {
      ;(e = tendrils[t]).update(mouse.current)
      e.draw(context)
    }
    raf.current = requestAnimationFrame(loop)
  }

  useEffect(() => {
    initCanvas()
    document.body.addEventListener('orientationchange', initCanvas)
    window.addEventListener('resize', initCanvas)
    return () => {
      document.body.removeEventListener('orientationchange', initCanvas)
      window.removeEventListener('resize', initCanvas)
    }
  }, [])

  useEffect(() => {
    raf.current = requestAnimationFrame(loop)
    return () => {
      raf.current && cancelAnimationFrame(raf.current)
    }
  }, [context])
}
