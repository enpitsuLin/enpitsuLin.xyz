import useScroll from '@/hooks/useScroll';
import React, { useEffect, useState, useCallback } from 'react';
import './style.scss';

const ToTop: React.FC = () => {
  const scroll = useScroll();

  const [visible, setVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setVisible(scroll.top > 200);
  }, [scroll]);
  return (
    <div
      onClick={scrollToTop}
      className={
        visible
          ? 'fixed bottom-9 right-9 z-50 transition-all opacity-100'
          : 'fixed bottom-9 right-9 z-50 transition-all opacity-0'
      }
    >
      <i className="fa fa-arrow-up cursor-pointer text-2xl" />
    </div>
  );
};

export default ToTop;
