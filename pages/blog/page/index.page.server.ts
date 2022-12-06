import { PageContextBuiltIn } from 'vite-plugin-ssr/types';

export interface PageProps {}

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
  return {
    pageContext: {
      pageProps: {
        data: pageContext.routeParams
      }
    }
  };
}

export async function prerender() {
  return ['/'];
}
