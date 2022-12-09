import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '~/hooks/useTranslation';
import { Link } from './Link';
import { LocaleSwitch } from './LocaleSwitch';
import { MobileNav } from './MobileNav';
import { ThemeSwitch } from './ThemeSwitch';

export const Header = () => {
  const { t } = useTranslation();

  const nav = [
    { href: '/', title: t('common.home') },
    { href: '/blog', title: t('common.blog') },
    { href: '/tags', title: t('post.tags') }
  ];

  const [stuck, setStuck] = useState(false);
  const ref = useRef<HTMLHeadElement>(null);

  const stuckClasses =
    'py-2 md:py-3 sticky -top-1 z-50 transition-all backdrop-filter backdrop-blur-md mx-auto border-b border-slate-900/10 dark:border-slate-300/10 w-full';
  const unstuckClasses =
    'py-2 md:py-6 sticky -top-1 z-50 transition-all mx-auto border-b border-b-0 border-slate-900/10 dark:border-slate-300/10 w-full';

  const classes = stuck ? stuckClasses : unstuckClasses;

  useEffect(() => {
    if (!ref.current) return;
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => {
        setStuck(e.intersectionRatio < 1);
      },
      { threshold: [1.0] }
    );
    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, [ref]);

  return (
    <header className={classes} ref={ref}>
      <div
        className={`flex justify-between items-center px-4 mx-auto sm:px-6 xl:px-0 transition-all duration-500 ${
          stuck ? 'max-w-5xl xl:max-w-8xl' : 'max-w-3xl xl:max-w-6xl'
        }`}
      >
        <Link href="/" aria-label="enpitsulin's Blog" className="font-semibold h-6 text-2xl sm:block ">
          enpitsulin
        </Link>

        <div className="flex text-base leading-5 items-center">
          <div className="hidden sm:block">
            {nav.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="font-medium p-1 text-gray-900 sm:p-4 dark:text-gray-200 hover:text-gray-500 dark:hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <LocaleSwitch />
          <MobileNav nav={nav} />
        </div>
      </div>
    </header>
  );
};
