import { useCallback } from 'react';
import { Heading } from '~/lib/types';

const Toc: React.FC<{ toc: Heading[] }> = ({ toc }) => {
  const handleScrollToToc = useCallback((selector: string) => {
    const el = document.querySelector(selector) as HTMLElement;
    const { offsetTop } = el;
    window.scrollTo({ top: offsetTop - 69, behavior: 'smooth' });
  }, []);

  return (
    <div className="h-0 py-8 lg:block">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Table of Content</h2>
      <ul className="pt-2">
        {toc.map((heading) => (
          <li
            key={heading.value}
            onClick={() => {
              handleScrollToToc(heading.url);
            }}
          >
            <span
              className="cursor-pointer text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              style={{ marginLeft: `${heading.depth - 1}rem` }}
            >
              {heading.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Toc };
