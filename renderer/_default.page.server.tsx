import { renderToString } from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr';
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';
import { PageWrapper } from '~/components/PageWrapper';
import logoUrl from './logo.svg';
import type { PageContext } from './types';

export { render };

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'documentProps'];

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const { Page, pageProps } = pageContext;
  const pageHtml = renderToString(
    <PageWrapper pageContext={pageContext}>
      <Page {...pageProps} />
    </PageWrapper>
  );

  // See https://vite-plugin-ssr.com/html-head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || 'Vite SSR app';
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr';

  const injected = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body class="bg-white text-black antialiased dark:bg-gray-900 dark:text-white transition-all duration-300">
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml: injected,
    pageContext: {}
  };
}
