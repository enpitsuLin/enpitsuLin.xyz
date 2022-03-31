import { useEffect, useRef } from 'react'
import { useRenderCanvas } from './renderCanvas'

interface Props {
  welcome: string
}

const Hero: React.FC<Props> = ({ welcome }) => {
  const canvas = useRef<HTMLCanvasElement>()
  const ref = useRef<HTMLDivElement>(null)
  useRenderCanvas()
  useEffect(() => {
    ref.current?.classList.add('transition-in')
  }, [])
  return (
    <div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
      <div className="relative z-10 flex h-[calc(100vh_-_135px)] items-center justify-center">
        <div ref={ref} className="px-4 text-3xl md:text-4xl cursor-default">
          {welcome.split('').map((latter, index) => (
            <span
              style={{ transitionDelay: 0.2 * (index + 1) + 's' }}
              className="opacity-0 transition-opacity"
              key={index}
            >
              {latter}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
