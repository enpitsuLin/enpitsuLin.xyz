import useScroll from '@/hooks/useScroll';
import React, { FunctionComponent, HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import classNames from '_classnames@2.3.1@classnames';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  offsetTop?: number;
  target?: HTMLElement;
}

const Affix: FunctionComponent<Props> = ({ offsetTop, target, ...attrs }) => {
  const scroll = useScroll();
  const [affixed, setAffixed] = useState(false);
  const affix = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const affixScrollTop = affix.current?.getBoundingClientRect().top || 0;
    console.log(affixScrollTop);

    if (!affixed && affixScrollTop < (offsetTop as number)) {
      setAffixed(true);
    }
    if (affixed && affixScrollTop >= (offsetTop as number)) {
      setAffixed(false);
    }
  }, [scroll]);
  return (
    <div {...attrs} ref={affix} className={classNames(affixed && 'fixed')} style={{ top: offsetTop }}>
      {attrs.children}
    </div>
  );
};

Affix.defaultProps = {
  offsetTop: 0
};

export default Affix;
