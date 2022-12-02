import { getClient, indexQuery, Post } from './sanity'
import kebabCase from './utils/kebabCase'

export async function getAllTags() {
  const fms = await getClient().fetch<Post[]>(indexQuery)
  const tags = fms.map((fm) => fm.tags).flat()

  const tagCount: Record<string, number> = tags.reduce((map, tag) => {
    const formattedTag = kebabCase(tag)
    map[formattedTag] = formattedTag in map ? map[formattedTag] + 1 : 1
    return map
  }, {} as Record<string, number>)
  return tagCount
}
