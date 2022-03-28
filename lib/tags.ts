import { getAllFilesFrontMatter } from './mdx'
import kebabCase from './utils/kebabCase'
import { flattenArray } from './utils/files'

export async function getAllTags() {
  const fms = await getAllFilesFrontMatter('blog')

  const tagCount = flattenArray(fms.map((fm) => fm.tags)).reduce((map, tag) => {
    const formattedTag = kebabCase(tag)
    map[formattedTag] = formattedTag in map ? map[formattedTag] + 1 : 1
    return map
  }, {} as Record<string, number>)
  return tagCount
}
