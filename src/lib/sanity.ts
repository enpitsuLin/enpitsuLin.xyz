import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { Post } from '@/types'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV !== 'production',
  apiVersion: '2021-03-25',
}

export const sanityClient = createClient(config)

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview?: boolean) => (preview ? previewClient : sanityClient)

export const imageBuilder = createImageUrlBuilder(config)

export const urlForImage = (source) => imageBuilder.image(source).auto('format').fit('max')

const postFields = `
  _id,
  title,
  date,
  summary,
  tags,
  "slug": slug.current,
`

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postQuery = `
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  content,
  ${postFields}
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const postUpdatedQuery = `*[_type == "post" && _id == $id].slug.current`

export function getPost(slug: string, preview = false) {
  return getClient(preview).fetch<Omit<Post, 'wordCount' | 'toc' | 'readingTime'>>(postQuery, {
    slug,
  })
}
