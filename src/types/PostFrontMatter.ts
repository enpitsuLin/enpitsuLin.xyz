export type PostFrontMatter = {
  title: string
  date: string
  tags: string[]
  readingTime: {
    minutes: number
    text: string
    time: number
    words: number
  }
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  canonicalUrl?: string
  slug: string
  fileName: string
}
