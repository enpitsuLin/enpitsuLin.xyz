import { clsx } from 'clsx';
import { ComponentType, createElement, PropsWithChildren } from 'react';
import { navigate } from 'vite-plugin-ssr/client/router';
import { useTranslation } from '~/hooks/useTranslation';
import FaArrowLeft from '~icons/fa6-solid/arrow-left';
import FaArrowRight from '~icons/fa6-solid/arrow-right';
import { Link } from './Link';

interface Props {
  totalPages: number;
  currentPage: number;
}

interface ButtonProps {
  disabled?: boolean;
  href?: string;
  suffix?: ComponentType;
  prefix?: ComponentType;
}

const PaginationButton: React.FC<PropsWithChildren<ButtonProps>> = ({
  href,
  disabled = false,
  prefix,
  suffix,
  children
}) => {
  const disableClasses = 'cursor-not-allowed disabled:opacity-50';
  return (
    <button className={clsx(['flex items-center justify-center', disabled && disableClasses])} disabled={disabled}>
      {prefix && createElement(prefix)}
      <span className="mx-2">{disabled ? children : <Link href={href}>{children}</Link>}</span>
      {suffix && createElement(suffix)}
    </button>
  );
};

const Pagination: React.FC<Props> = ({ totalPages, currentPage }) => {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;
  const { t } = useTranslation();
  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        <PaginationButton
          prefix={FaArrowLeft}
          disabled={!prevPage}
          href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}
        >
          {t('post.page.previous')}
        </PaginationButton>

        <span>
          {currentPage} of {totalPages}
        </span>

        <PaginationButton suffix={FaArrowRight} disabled={!nextPage} href={`/blog/page/${currentPage + 1}`}>
          {t('post.page.next')}
        </PaginationButton>
      </nav>
    </div>
  );
};

export { Pagination };
