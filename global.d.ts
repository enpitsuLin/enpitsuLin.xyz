interface Window {
  disqus_config: any
  DISQUS: any
  dataLayer: any[]
  gtag: (...arguments: any[]) => void
  plausible: { q: any[]; (...arguments: any[]): void }
  sa_event: (...arguments: any[]) => void
}
