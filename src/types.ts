export type Toc = {
  value: string
  depth: number
  url: string
}[]

export interface Post {
  title: string
  date: string
  slug: string
  summary: string
  tags: string[]
  content?: string
  readingTime: string
  wordCount: number
  toc: Toc
}
