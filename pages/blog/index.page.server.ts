import { PageContextBuiltIn } from 'vite-plugin-ssr/types';
import { getClient, indexQuery, postQuery } from '../../lib/sanity';

export interface PageProps {}

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const slug = pageContext.routeParams.slug;
  const data = await getClient().fetch(postQuery, { slug });
  return {
    pageContext: {
      pageProps: {
        slug,
        data
      }
    }
  };
}

export async function prerender() {
  const data = await getClient().fetch(indexQuery);
  return data.map((item: any) => item.slug);
}
