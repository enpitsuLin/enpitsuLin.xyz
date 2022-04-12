import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from 'data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ReactNode } from 'react'
import { PostFrontMatter } from '@/types/PostFrontMatter'
import Comments from '@/components/Comments'
import { Toc } from '@/types/Toc'
import PostHeader from '@/components/PostHeader'

interface Props {
  frontMatter: PostFrontMatter
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  toc: Toc
}

const PostLayout: React.FC<Props> = ({ frontMatter, next, prev, children, toc }) => {
  const { slug, date, title } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <ScrollTopAndComment toc={toc} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <PostHeader frontMatter={frontMatter} />
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </div>
            <Comments mapping={title} />
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
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
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
export default PostLayout
