import type { ElementContent, Root, RootContent } from "hast";
import type { HResult } from "hastscript/lib/core";
import type { Plugin } from "unified";
import { SKIP, visit } from 'unist-util-visit';

export interface HProps {
  children: ElementContent[]
  [attribute: string]: any
}
export type HComponent = (props: HProps) => HResult

interface Options {
  components?: Record<string, HComponent>
}
/** 
 * @example
 * ```
 * const SomeComponent: HComponent = (p) => h('div', { class: 'some-class' }, ...p.children)
 * # use it 
 * rehypeComponents({components:{'some-component':SomeComponent}})
 * # then in markdown file
 * "<some-component></some-component>"
 * ```
 */
const rehypeComponents: Plugin<[Options], Root> =
  ({ components = {} }) => {
    return (tree, _vfile) => {
      visit(tree, (node, index, parent) => {
        if (node.type !== 'element' || !parent) return
        if (node.tagName in components) {
          const renderToComponent = components[node.tagName]
          const replacedNode = renderToComponent({
            ...node.properties ?? {},
            children: node.children
          })
          parent.children[index!] = replacedNode as RootContent;
          return [SKIP, index];
        }
      })
    }
  }

export default rehypeComponents
