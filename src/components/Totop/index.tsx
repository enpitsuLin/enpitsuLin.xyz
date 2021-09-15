import useScroll from '@/hooks/useScroll';
import React, { useEffect, useState, useCallback, FunctionComponent } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styled from '@emotion/styled';

const ToTopWrap = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 2.25rem;
  right: 2.24rem;
  transition: opacity ease-in-out 0.3s;
  z-index: 1001;
  opacity: ${props => (props.visible ? 100 : 0)};
  .to-top {
    font-size: 2.25rem;
    line-height: 2.5rem;
    cursor: pointer;
  }
`;

const ToTop: FunctionComponent = () => {
  const scroll = useScroll();

  const [visible, setVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setVisible(scroll.top > 20);
  }, [scroll]);
  return (
    <ToTopWrap onClick={scrollToTop} visible={visible}>
      <FaArrowUp className="to-top text-4xl" />
    </ToTopWrap>
  );
};

export default ToTop;
