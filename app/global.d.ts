interface Window {
  disqus_config: () => void
  DISQUS: {
    reset: ({ reload: boolean }) => void
  }
  dataLayer: any[]
  gtag: (...arguments: any[]) => void
  plausible: { q: any[]; (...arguments: any[]): void }
  sa_event: (...arguments: any[]) => void
}
