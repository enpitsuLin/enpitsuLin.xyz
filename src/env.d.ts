/// <reference types="astro/client" />
/// <reference types="astro/import-meta" />
interface Window {
  DISQUS: {
    reset: ({ reload: boolean }) => void;
  };
}
