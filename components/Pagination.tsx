import { clsx } from 'clsx';
import { ComponentType, createElement, PropsWithChildren } from 'react';
import FaArrowLeft from '~icons/fa6-solid/arrow-left';
import FaArrowRight from '~icons/fa6-solid/arrow-right';
import { Link } from './Link';

interface Props {
  totalPages: number;
  currentPage: number;
}

interface ButtonProps {
  disabled?: boolean;
  suffix?: ComponentType;
  prefix?: ComponentType;
}

const IconButton: React.FC<PropsWithChildren<ButtonProps>> = ({ disabled = false, prefix, suffix, children }) => {
  const disableClasses = 'cursor-not-allowed disabled:opacity-50';
  return (
    <button className={clsx(['flex items-center justify-center', disabled && disableClasses])} disabled={disabled}>
      {prefix && createElement(prefix)}
      <span className="mx-2">{children}</span>
      {suffix && createElement(suffix)}
    </button>
  );
};

const Pagination: React.FC<Props> = ({ totalPages, currentPage }) => {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <IconButton prefix={FaArrowLeft} disabled={!prevPage}>
            Previous
          </IconButton>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <IconButton prefix={FaArrowLeft}>Previous</IconButton>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <IconButton suffix={FaArrowRight} disabled={!nextPage}>
            Next
          </IconButton>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <IconButton suffix={FaArrowRight}>Next</IconButton>
          </Link>
        )}
      </nav>
    </div>
  );
};

export { Pagination };
