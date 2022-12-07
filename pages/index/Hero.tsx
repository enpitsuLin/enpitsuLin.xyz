import { useEffect, useRef } from 'react';
import { useRenderHero } from './Hero.lib';

interface Props {
  welcome: string;
}

const Hero: React.FC<Props> = ({ welcome }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parent = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useRenderHero(canvas);
  useEffect(() => {
    ref.current?.classList.add('transition-in');
  }, []);
  return (
    <div ref={parent} className="pointer-events-none">
      <canvas ref={canvas} className="w-full h-full bg-skin-base absolute inset-0 pointer-events-auto" id="canvas" />
      <div className="relative z-10 flex -mt-24 h-[calc(100vh_-_6rem)] items-center justify-center">
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
  );
};

export { Hero };
