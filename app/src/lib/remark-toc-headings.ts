import type { Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { kebabCase } from '@packages/lib/kebab-case'
import { toString } from 'mdast-util-to-string'
import type { Heading } from 'mdast'

export default function remarkTocHeadings(options) {
  return (tree: Parent) =>
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + kebabCase(textContent),
        depth: node.depth,
      })
    })
}
