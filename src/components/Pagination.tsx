import Link from '@/components/Link'
import { ReactNode } from 'react'
import CarbonArrowLeft from '~icons/carbon/arrow-left'
import CarbonArrowRight from '~icons/carbon/arrow-right'
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

const IconButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  disabled = false,
  prefix,
  suffix,
  children,
}) => {
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
          <IconButton prefix={() => <CarbonArrowLeft />} disabled={!prevPage}>
            {t('post.page.previous')}
          </IconButton>
        )}
        {prevPage && (
          <IconButton prefix={() => <CarbonArrowLeft />}>
            <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
              {t('post.page.previous')}
            </Link>
          </IconButton>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <IconButton suffix={() => <CarbonArrowRight />} disabled={!nextPage}>
            {t('post.page.next')}
          </IconButton>
        )}
        {nextPage && (
          <IconButton suffix={() => <CarbonArrowRight />}>
            <Link href={`/blog/page/${currentPage + 1}`}>{t('post.page.next')}</Link>
          </IconButton>
        )}
      </nav>
    </div>
  )
}

export default Pagination
