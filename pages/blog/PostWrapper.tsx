import FaArrowLeft from '~icons/fa6-solid/arrow-left';
import { Link } from '../../components/Link';

export const PostWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">
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
            </div>
          </div>
          <footer>
            <div className="divide-gray-200 text-sm font-medium leading-5 flex-col lg:flex-row dark:divide-gray-700 flex justify-between"></div>
          </footer>
        </div>
      </article>
    </div>
  );
};
