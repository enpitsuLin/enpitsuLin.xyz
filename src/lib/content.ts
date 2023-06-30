import { getCollection, getEntryBySlug } from 'astro:content';

const blogCollection = await getCollection('blog')
  .then(res => res.filter(p => !p.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()))

export const usePost = async (slug: string) => {
  const entry = await getEntryBySlug('blog', slug)
  return entry
};

export const usePosts = (option?: { limit?: number, skip?: number }) => {
  return [...blogCollection]
    .slice(option?.skip ?? 0,
      option?.limit ? (option?.skip ?? 0 + option?.limit) : undefined)
};

export const usePostsSlug = () => {
  return blogCollection.map(item => item.slug)
};

export const usePostsCount = () => {
  return blogCollection.length + 1
};

export const useAllTags = () => {
  return Array.from(
    new Set(blogCollection.map((post) => post.data.tags).
      filter(Boolean as unknown as ((a: string[] | undefined) => a is string[])).flat()
    )
  )
};

export const usePostsByTag = (tag: string) => {
  return blogCollection.filter(item => item.data.tags?.includes(tag))
};

export const useArchives = () => {
  return blogCollection
};
