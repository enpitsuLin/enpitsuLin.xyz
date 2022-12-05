import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PostHeader from '@/components/PostHeader'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import TableOfContent from '@/components/TableOfContent'
import Tag from '@/components/Tag'
import { Post } from '@/types'
import siteMetadata from 'data/siteMetadata'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'
import FaArrowLeft from '~icons/fa6-solid/arrow-left'

interface Props {
  post: Post
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

const PostLayout: React.FC<Props> = ({ post, next, prev, children }) => {
  const { t } = useTranslation('common')
  const { slug, tags, readingTime } = post

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...post} />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <PostHeader post={post} />
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 hidden lg:block">
              <div className="py-4 xl:py-8">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 flex items-center"
                >
                  <FaArrowLeft className="mr-3" />
                  Back to the blog
                </Link>
              </div>
              {tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {t('header.tags')}
                  </h2>
                  <div className="pt-2 flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              <TableOfContent toc={post.toc} />
            </div>
          </div>
          <footer>
            <div className="divide-gray-200 text-sm font-medium leading-5 flex-col lg:flex-row dark:divide-gray-700 flex justify-between">
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
                <div className="py-4 sm:text-right xl:pt-8">
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
          <Comments post={post} />
        </div>
      </article>
    </SectionContainer>
  )
}
export default PostLayout
