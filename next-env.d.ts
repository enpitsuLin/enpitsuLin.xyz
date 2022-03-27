/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface Window {
  disqus_config: any
  DISQUS: any
  dataLayer: any[]
  gtag: (...arguments: any[]) => void
  plausible: { q: any[]; (...arguments: any[]): void }
  sa_event: (...arguments: any[]) => void
}
