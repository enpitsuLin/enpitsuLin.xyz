import { createRoot, hydrateRoot, Root } from 'react-dom/client';
import 'virtual:windi.css';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router';
import './style.css';
import type { PageContext } from './types';
import { Document } from './_document';

export const clientRouting = true;

export const hydrationCanBeAborted = true;

let root: Root;
export async function render(pageContext: PageContextBuiltInClient & PageContext) {
  const page = <Document pageContext={pageContext} />;
  const container = document.getElementById('page-view')!;
  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else {
    if (!root) {
      root = createRoot(container);
    }
    root.render(page);
  }
}

export function onTransitionStart() {
  console.log('Page transition start');
}

export function onTransitionEnd() {
  console.log('Page transition end');
}
