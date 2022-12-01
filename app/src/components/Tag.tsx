import { kebabCase } from '@packages/lib/kebab-case'
import Link from 'next/link'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium lowercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      &#x23;{text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
