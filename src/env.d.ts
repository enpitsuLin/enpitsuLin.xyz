/// <reference types="astro/client" />
interface Window {
  DISQUS: {
    reset: ({ reload: boolean }) => void;
  };
}
