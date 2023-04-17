/// <reference types="astro/client" />
/// <reference types="astro/import-meta" />
import type { AttributifyAttributes } from '@unocss/preset-attributify'
interface Window {
  DISQUS: {
    reset: ({ reload: boolean }) => void;
  };
}

declare global {
  namespace astroHTML.JSX {
    type HTMLAttributes = AttributifyAttributes
  }
}
