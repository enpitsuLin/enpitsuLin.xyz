import formatDate from '@/lib/utils/formatDate'
import { PostFrontMatter } from '@/types/PostFrontMatter'
import PageTitle from './PageTitle'
import Tag from './Tag'

interface Props {
  frontMatter: PostFrontMatter
}

const PostHeader: React.FC<Props> = ({ frontMatter }) => {
  const { title, date, readingTime, tags } = frontMatter
  return (
    <header className="pt-6 xl:pb-6">
      <div className="space-y-8 text-center">
        <PageTitle>{title}</PageTitle>
        <div>
          <dl className="flex justify-center flex-wrap space-x-4">
            <div>
              <dt className="sr-only">Tags</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Word count</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                约 {readingTime.words} 字
              </dd>
            </div>
            <div>
              <dt className="sr-only">Reading time</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                {Math.round(readingTime.minutes)} 分钟阅读
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  )
}

export default PostHeader
