import clsx from 'clsx';
import { usePageContext } from '~/hooks/usePageContext';

interface LinkProp extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export const Link: React.FC<LinkProp> = (props) => {
  const pageContext = usePageContext();
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ');
  return <a {...props} className={className} />;
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
