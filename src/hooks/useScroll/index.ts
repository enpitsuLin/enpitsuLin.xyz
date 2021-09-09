import { useEffect, useState } from 'react';

interface ScrollData {
  top: number;
  left: number;
}

/**
 * window滚动hooks
 * @returns {ScrollData} scrollData
 */
export default function useScroll(target?: HTMLElement): ScrollData {
  const [scroll, setScroll] = useState<ScrollData>({ top: NaN, left: NaN });

  useEffect(() => {
    const handler = () => {
      setScroll({ top: window.scrollY, left: window.scrollX });
    };
    let el = target || window;
    handler();
    el.addEventListener('scroll', handler);
    return () => {
      el.removeEventListener('scroll', handler);
    };
  }, []);
  return scroll;
}
