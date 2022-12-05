import Link from '@/components/Link'
import { ReactNode } from 'react'
import FaArrowLeft from '~icons/fa-solid/arrow-left'
import FaArrowRight from '~icons/fa-solid/arrow-right'
import useTranslation from 'next-translate/useTranslation'
import { classes } from '@/lib/utils/classes'

interface Props {
  totalPages: number
  currentPage: number
}

interface ButtonProps {
  disabled?: boolean
  suffix?: () => ReactNode
  prefix?: () => ReactNode
}

const IconButton: React.FC<ButtonProps> = ({ disabled = false, prefix, suffix, children }) => {
  const disableClasses = 'cursor-not-allowed disabled:opacity-50'
  return (
    <button
      className={classes(['flex items-center justify-center', disabled && disableClasses])}
      disabled={disabled}
    >
      {prefix && prefix()}
      <span className="mx-2">{children}</span>
      {suffix && suffix()}
    </button>
  )
}

const Pagination: React.FC<Props> = ({ totalPages, currentPage }) => {
  const { t } = useTranslation('common')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <IconButton prefix={() => <FaArrowLeft />} disabled={!prevPage}>
            {t('post.page.previous')}
          </IconButton>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <IconButton prefix={() => <FaArrowLeft />}>{t('post.page.previous')}</IconButton>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <IconButton suffix={() => <FaArrowRight />} disabled={!nextPage}>
            {t('post.page.next')}
          </IconButton>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <IconButton suffix={() => <FaArrowRight />}>{t('post.page.next')}</IconButton>
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Pagination
