declare global {
  interface Window {
    disqus_config: any
    DISQUS: any
    dataLayer: any[]
    gtag: (...arguments: any[]) => void
    plausible: { q: any[]; (...arguments: any[]): void }
    sa_event: (...arguments: any[]) => void
  }
}

declare module 'mdast-util-to-string' {
  export function toString(node: any): string
}
