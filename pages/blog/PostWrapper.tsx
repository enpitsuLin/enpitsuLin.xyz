import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, Tag } from '~/components/Link';
import { Heading, Post } from '~/lib/types';
import FaArrowLeft from '~icons/fa6-solid/arrow-left';
import FaArrowUp from '~icons/fa6-solid/arrow-up';
import FaComment from '~icons/fa6-solid/comment';
import Comments from './Comment';
import { Toc } from './Toc';

type Props = { post: Post; toc: Heading[] };

export const PostWrapper: React.FC<React.PropsWithChildren<Props>> = ({ post, toc, children }) => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 hidden lg:block">
              <div className="py-4 xl:py-8">
                <Link href="/blog" className="text-primary-500 hover:text-primary-600 flex items-center">
                  <FaArrowLeft className="mr-3" />
                  Back to the blog
                </Link>
              </div>
              {post.tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Tags</h2>
                  <div className="pt-2 flex flex-wrap">
                    {post.tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              <Toc toc={toc} />
            </div>
          </div>
          <footer>
            <div className="divide-gray-200 text-sm font-medium leading-5 flex-col lg:flex-row dark:divide-gray-700 flex justify-between"></div>
          </footer>
          <Comments post={post} />
        </div>
      </article>
    </div>
  );
};

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, ...rest }) => {
  const classes = clsx([
    rest.className,
    'rounded-full bg-gray-200 p-2 text-gray-700 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
  ]);
  return (
    <button {...rest} type="button" className={classes}>
      {children}
    </button>
  );
};

const ScrollTopAndComment: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView();
  };
  return (
    <div className="fixed right-8 bottom-8 hidden flex-col gap-3 md:flex z-20">
      <Button aria-label="Scroll To Comment" onClick={handleScrollToComment}>
        <FaComment className="h-4 w-4" />
      </Button>

      <Button aria-label="Scroll To Top" className={show ? 'md:block' : 'md:hidden'} onClick={handleScrollTop}>
        <FaArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
};
