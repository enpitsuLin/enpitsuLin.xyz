/* eslint-disable */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/import-meta" />  

interface Window {
  DISQUS: {
    reset: ({ reload: boolean }) => void;
  };
}

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    [name: string]: any
  }
}
