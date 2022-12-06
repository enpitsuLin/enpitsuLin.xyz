import { PageContextBuiltIn } from 'vite-plugin-ssr/types';
import { getClient, indexQuery } from '../lib/sanity';

export interface PageProps {}

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const slug = pageContext.routeParams.slug;
  const data = await getClient().fetch(indexQuery);
  return {
    pageContext: {
      pageProps: {
        slug,
        data
      }
    }
  };
}
