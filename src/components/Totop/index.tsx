import React, { useEffect, useState, useCallback } from 'react';
import './style.scss';

const ToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 200);
    };
    handler();
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);
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
