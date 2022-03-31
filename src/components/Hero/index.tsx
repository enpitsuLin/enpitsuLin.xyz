import { useRef } from 'react'
import { useRenderCanvas } from './renderCanvas'

const Hero: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>()
  useRenderCanvas()
  return (
    <div>
      <canvas
        ref={canvas}
        className="bg-skin-base pointer-events-none absolute inset-0"
        id="canvas"
      ></canvas>
      <div className="relative z-10 flex h-[calc(100vh_-_135px)] items-center justify-center">
        <div className="px-4 text-3xl md:text-4xl pointer-events-none">无语了</div>
      </div>
    </div>
  )
}

export default Hero
