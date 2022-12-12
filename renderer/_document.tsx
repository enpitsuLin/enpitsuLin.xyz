import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PageWrapper } from '~/components/PageWrapper';
import { PageContext } from './types';
import { siteMeta } from '~/package.json';

export interface DocumentProps {
  pageContext: PageContext;
}

export const Document: React.FC<DocumentProps> = ({ pageContext }) => {
  const { Page, pageProps } = pageContext;
  return (
    <HelmetProvider context={{}}>
      <PageWrapper pageContext={pageContext}>
        <Helmet>
          <meta charSet="UTF-8" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed" />
          <meta name="description" content="${desc}" />
          {import.meta.env.PROD && (
            <script
              async
              defer
              data-website-id={siteMeta.umami}
              src="https://umami.enpitsulin.xyz/umami-analytics.js"
            />
          )}
        </Helmet>
        <Page {...pageProps} />
      </PageWrapper>
    </HelmetProvider>
  );
};
