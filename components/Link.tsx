import clsx from 'clsx';
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from '~/hooks/usePageContext';
import { localeDefault } from '~/lib/locales';

interface LinkProp extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  locale?: string;
}

export const Link: React.FC<LinkProp> = (props) => {
  let { href, locale, ...anchorProps } = props;
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');
  const className = clsx([props.className, 'cursor-pointer']);

  const pageContext = usePageContext();
  locale = props.locale || pageContext.locale;
  if (locale !== localeDefault) {
    href = '/' + locale + href;
  }

  if (isInternalLink) {
    return <a {...anchorProps} className={className} onClick={() => navigate(href!)} />;
  }
  if (isAnchorLink) {
    return <a {...props} className={className} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} className={className} />;
};

export const Tag: React.FC<LinkProp & { text: string }> = ({ text, className, children, ...rest }) => {
  return (
    <Link
      className={clsx(
        className,
        'mr-3 text-sm font-medium lowercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
      )}
      {...rest}
    >
      # {text}
      {children}
    </Link>
  );
};
