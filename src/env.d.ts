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
