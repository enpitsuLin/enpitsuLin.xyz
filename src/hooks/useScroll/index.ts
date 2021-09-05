import { useEffect, useState } from 'react';

interface ScrollData {
  top: number;
  left: number;
}

/**
 * window滚动hooks
 * @returns {ScrollData} scrollData
 */
export default function useScroll(): ScrollData {
  const [scroll, setScroll] = useState<ScrollData>({ top: NaN, left: NaN });

  useEffect(() => {
    const handler = () => {
      setScroll({ top: window.scrollY, left: window.scrollX });
    };
    handler();
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);
  return scroll;
}
