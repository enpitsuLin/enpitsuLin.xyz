// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/import-meta" />
import type { AttributifyAttributes } from '@unocss/preset-attributify'


declare global {
  namespace astroHTML.JSX {
    type HTMLAttributes = AttributifyAttributes
  }
  interface Window {
    DISQUS: {
      reset: ({ reload: boolean }) => void;
    };
  }
}
