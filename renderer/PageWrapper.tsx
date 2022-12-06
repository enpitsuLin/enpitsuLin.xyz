import React from 'react';
import { Content, Layout, Logo, Sidebar } from '../components/DefaultComponents';
import { Link } from './Link';
import type { PageContext } from './types';
import { PageContextProvider } from './usePageContext';

export { PageWrapper };

function PageWrapper({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          <Sidebar>
            <Logo />
            <Link className="py-1 px-2" href="/">
              Home
            </Link>
            <Link className="py-1 px-2" href="/dynamic">
              Dynamic
            </Link>
            <Link className="py-1 px-2" href="/static">
              Static
            </Link>
            <Link className="py-1 px-2" href="/isr">
              ISR
            </Link>
            <Link className="py-1 px-2" href="/named/id-1">
              Named
            </Link>
            <Link className="py-1 px-2" href="/catch-all/a/b/c">
              Catch-all
            </Link>
            <Link className="py-1 px-2" href="/function/a">
              Function
            </Link>
            <Link className="py-1 px-2" href="/edge">
              Edge Function endpoint
            </Link>
          </Sidebar>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  );
}
