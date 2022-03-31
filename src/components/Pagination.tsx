import Link from '@/components/Link'
import { ReactNode } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

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
      className={['flex items-center justify-center', disabled && disableClasses]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
    >
      {prefix && prefix()}
      <span className="mx-2">{children}</span>
      {suffix && suffix()}
    </button>
  )
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <IconButton prefix={() => <FaArrowLeft />} disabled={!prevPage}>
            Previous
          </IconButton>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <IconButton prefix={() => <FaArrowLeft />}>Previous</IconButton>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <IconButton suffix={() => <FaArrowRight />} disabled={!nextPage}>
            Next
          </IconButton>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <IconButton suffix={() => <FaArrowRight />}>Next</IconButton>
          </Link>
        )}
      </nav>
    </div>
  )
}
