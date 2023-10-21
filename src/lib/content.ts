import { getCollection, getEntryBySlug } from 'astro:content';

interface ContentOptions {
  limit?: number
  skip?: number
}

const blogCollection = await getCollection('blog')
  .then(res => res.filter(p => !p.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()))

const weeklyCollection = await getCollection('weekly')
  .then(res => res.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()))

export const usePost = async (slug: string) => {
  const entry = await getEntryBySlug('blog', slug)
  return entry
};

export const usePosts = (option?: ContentOptions) => {
  return [...blogCollection]
    .slice(option?.skip ?? 0,
      option?.limit ? (option?.skip ?? 0 + option.limit) : undefined)
};

export const usePostsSlug = () => {
  return blogCollection.map(item => item.slug)
};

export const usePostsCount = () => blogCollection.length 

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

export const useWeekly = (options?: ContentOptions) => {
  return [...weeklyCollection]
    .slice(options?.skip ?? 0,
      options?.limit ? (options?.skip ?? 0 + options.limit) : undefined)
}

export const useWeeklyCount = () => weeklyCollection.length 
