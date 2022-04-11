import formatDate from '@/lib/utils/formatDate'
import PageTitle from './PageTitle'

interface Props {
  title: string
  date: string
}

const PostHeader: React.FC<Props> = ({ title, date }) => {
  return (
    <header className="pt-6 xl:pb-6">
      <div className="space-y-1 text-center">
        <dl className="space-y-10">
          <div>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </div>
        </dl>
        <div>
          <PageTitle>{title}</PageTitle>
        </div>
      </div>
    </header>
  )
}

export default PostHeader
