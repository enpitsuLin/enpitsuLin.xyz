import useScroll from '@/hooks/useScroll';
import React, { useEffect, useState, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import classNames from 'classnames';

const ToTop: React.FC = () => {
  const scroll = useScroll();

  const [visible, setVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setVisible(scroll.top > 20);
  }, [scroll]);
  return (
    <div
      onClick={scrollToTop}
      className={classNames(
        'fixed bottom-9 right-9 z-50',
        'duration-300 transition-opacity',
        visible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <FaArrowUp className="text-4xl text-white cursor-pointer" />
    </div>
  );
};

export default ToTop;
