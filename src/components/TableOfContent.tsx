import { Toc } from '@/types/Toc'
import useTranslation from 'next-translate/useTranslation'

const TableOfContent: React.FC<{ toc: Toc }> = ({ toc }) => {
  const { t } = useTranslation('common')
  const handleScrollToToc = (selector: string) => {
    const el = document.querySelector(selector) as HTMLElement
    const { offsetTop } = el
    window.scrollTo({
      top: offsetTop < 1000 ? offsetTop - 69 : offsetTop,
      behavior: 'smooth',
    })
  }

  return (
    <div className="h-0 py-8 top-10 hidden sticky lg:block">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {t('toc')}
      </h2>
      <ul>
        {toc.map((heading) => (
          <li key={heading.value}>
            <span
              onClick={() => {
                handleScrollToToc(heading.url)
              }}
              className="cursor-pointer"
            >
              {heading.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableOfContent
