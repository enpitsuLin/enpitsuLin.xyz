import useScroll from '@/hooks/useScroll';
import React, { CSSProperties, FunctionComponent, HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import classNames from '_classnames@2.3.1@classnames';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  offsetTop?: number;
  target?: HTMLElement;
}

const Affix: FunctionComponent<Props> = ({ offsetTop, target, ...attrs }) => {
  const scroll = useScroll();
  const [affixed, setAffixed] = useState(false);
  const affixWrap = useRef<HTMLDivElement>(null);
  const affix = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rect = affixWrap.current?.getBoundingClientRect();
    const affixScrollTop = rect?.top || 0;

    if (!affixed && affixScrollTop < (offsetTop as number)) {
      setAffixed(true);
    }
    if (affixed && affixScrollTop >= (offsetTop as number)) {
      setAffixed(false);
    }
  }, [scroll]);
  return (
    <div {...attrs} ref={affixWrap}>
      <div ref={affix} className={classNames(affixed && 'fixed')} style={{ top: offsetTop }}>
        {attrs.children}
      </div>
    </div>
  );
};

Affix.defaultProps = {
  offsetTop: 0
};

export default Affix;
