// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/import-meta" /> 

interface Window {
  DISQUS: {
    reset: ({ reload: boolean }) => void;
  };
} 
