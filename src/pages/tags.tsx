import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import siteMetadata from 'data/siteMetadata'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import useTranslation from 'next-translate/useTranslation'

export const getStaticProps: GetStaticProps<{ tags: Record<string, number> }> = async () => {
  const tags = await getAllTags()

  return { props: { tags } }
}

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('header.tags')}
          </h1>
        </div>

        <div className="flex flex-wrap w-full">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div
                key={t}
                className="inline-flex flex-row items-center relative font-medium mt-2 mb-2 mr-2 bg-day dark:bg-night bg-opacity-50 dark:bg-opacity-50"
              >
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="px-2 py-1 text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <span className="mr-3 text-sm font-medium lowercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    &#x23;{t.split(' ').join('-')}
                  </span>
                  <span>({tags[t]})</span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
