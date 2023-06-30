import { getCollection, getEntryBySlug } from 'astro:content';
import { addWeeks, isSameWeek } from 'date-fns';

interface ContentOptions {
  limit?: number
  skip?: number
}

const blogCollection = await getCollection('blog')
  .then(res => res.filter(p => !p.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()))

export const usePost = async (slug: string) => {
  const entry = await getEntryBySlug('blog', slug)
  return entry
};

export const usePosts = (option?: ContentOptions) => {
  return [...blogCollection]
    .slice(option?.skip ?? 0,
      option?.limit ? (option?.skip ?? 0 + option?.limit) : undefined)
};

export const usePostsSlug = () => {
  return blogCollection.map(item => item.slug)
};

export const usePostsCount = () => blogCollection.length + 1

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


const weeklyCollection = await getCollection('weekly')
  .then(res => res.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()))

export const useWeekly = async (year: number, week: number) => {
  const yearStartWeek = new Date(year, 0, 1)
  const targetDate = addWeeks(yearStartWeek, week)

  return weeklyCollection.find(c => {
    const date = c.data.date;
    return isSameWeek(targetDate, date, { weekStartsOn: 1 })
  })
}

export const useWeeklies = async (option?: ContentOptions) => {
  return [...weeklyCollection]
    .slice(option?.skip ?? 0,
      option?.limit ? (option?.skip ?? 0 + option?.limit) : undefined)
}

export const useWeekliesCount = () => weeklyCollection.length + 1
