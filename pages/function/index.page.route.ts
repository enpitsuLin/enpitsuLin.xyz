import { PageContextBuiltIn } from 'vite-plugin-ssr/types';

export default (pageContext: PageContextBuiltIn) => {
  if (!pageContext.urlPathname.startsWith('/function/')) return false;
  return {
    precedence: -1,
  };
};
