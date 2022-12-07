export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { OnBeforeRenderServer, OnBeforeRenderClient };

import type { ComponentType, PropsWithChildren } from 'react';
import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router'; // When using Client Routing
// import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client' // When using Server Routing

type MaybePromise<T> = Promise<T> | T;

type Page<Props = any> = ComponentType<PropsWithChildren<Props>>;

export type PageContextCustom<PageProps = Record<string, unknown>> = {
  Page: Page<PageProps>;
  pageProps?: PageProps;
  exports: {
    documentProps?: {
      title: string;
    };
  };
  documentProps?: {
    title: string;
    description: string;
  };
};

type PageContextServer<P = any> = PageContextBuiltIn<Page> & PageContextCustom<P>;
type PageContextClient<P = any> = PageContextBuiltInClient<Page> & PageContextCustom<P>;

type PageContext<P = any> = PageContextClient<P> | PageContextServer<P>;

type BeforeRenderServerReturn<P = any> = MaybePromise<{ pageContext: Partial<PageContextServer<P>> }>;

type OnBeforeRenderServer<P = any> = (content: PageContextBuiltIn) => BeforeRenderServerReturn<P>;

type BeforeRenderClientReturn<P = any> = MaybePromise<{ pageContext: Partial<PageContextClient<P>> }>;

type OnBeforeRenderClient<P = any> = (content: PageContextBuiltIn) => BeforeRenderClientReturn<P>;
