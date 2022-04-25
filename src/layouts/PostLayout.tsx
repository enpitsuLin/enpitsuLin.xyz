import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from 'data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ReactNode } from 'react'
import Image from '@/components/Image'
import { PostFrontMatter } from '@/types/PostFrontMatter'
import Comments from '@/components/Comments'
import { Toc } from '@/types/Toc'
import PostHeader from '@/components/PostHeader'
import { AuthorFrontMatter } from '@/types/AuthorFrontMatter'
import Tag from '@/components/Tag'
import useTranslation from 'next-translate/useTranslation'
import TOCInline from '@/components/TOCInline'

interface Props {
  frontMatter: PostFrontMatter
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  toc: Toc
}

const PostLayout: React.FC<Props> = ({ frontMatter, next, prev, children, toc }) => {
  const { t } = useTranslation('common')
  const { slug, tags, readingTime } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <PostHeader frontMatter={frontMatter} />
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <section>
              {tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {t('header.tags')}
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              <div className="bg-gray-200 dark:bg-gray-700 shadow p-2 rounded-md overflow-y-auto">
                <div className="prose dark:prose-dark">
                  <TOCInline toc={toc} asDisclosure />
                </div>
              </div>
            </section>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </div>
          </div>
          <footer>
            <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
              {prev && (
                <div className="py-4 xl:pt-8">
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && (
                <div className="py-4 xl:pt-8">
                  <Link
                    href={`/blog/${next.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
          <Comments frontMatter={frontMatter} />
        </div>
      </article>
    </SectionContainer>
  )
}
export default PostLayout
