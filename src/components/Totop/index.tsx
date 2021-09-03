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
    <div onClick={scrollToTop} className={visible ? 'visible to-top' : 'to-top'}>
      <i className="fa fa-arrow-up" />
    </div>
  );
};

export default ToTop;
