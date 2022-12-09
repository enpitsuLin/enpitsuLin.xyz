import { Link, Tag } from '~/components/Link';
import { PageSEO } from '~/components/SEO';
import { useTranslation } from '~/hooks/useTranslation';
import { Hero } from './Hero';
import { Props } from './index.page.server';

export const Page: React.FC<Props> = ({ posts, showMore }) => {
  const { t } = useTranslation();
  return (
    <>
      <PageSEO title="enpitsulin's blog" />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <Hero welcome={t('welcome')} />
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('post.latest')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Make Things happy</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && t('post.no-post')}
          {posts.map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <li key={slug} className="py-8">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">{t('post.published-on')}</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{date}</time>
                      </dd>
                    </dl>
                    <div className="space-y-4 xl:col-span-3">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {showMore && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 capitalize hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={t('post.all')}
          >
            {t('post.all')}
          </Link>
        </div>
      )}
    </>
  );
};
