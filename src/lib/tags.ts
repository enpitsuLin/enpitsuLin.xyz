import { getAllFilesFrontMatter } from './mdx'
import kebabCase from './utils/kebabCase'
import { flattenArray } from './utils/files'

export async function getAllTags() {
  const fms = await getAllFilesFrontMatter()

  const tagCount: Record<string, number> = flattenArray(fms.map((fm) => fm.tags)).reduce(
    (map, tag) => {
      const formattedTag = kebabCase(tag)
      map[formattedTag] = formattedTag in map ? map[formattedTag] + 1 : 1
      return map
    },
    {} as Record<string, number>
  )
  return tagCount
}
