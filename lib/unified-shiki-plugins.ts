import { visit } from 'unist-util-visit';
import type * as unified from 'unified';
import type * as hast from 'hast';

function isElement(node: hast.Node): node is hast.Element {
  return 'tagName' in node && node.tagName === 'pre';
}

const rehypeShikiClear: unified.Plugin<[], hast.Parent> = () => {
  return (tree) => {
    return visit(tree, isElement, (node: hast.Element) => {
      if (node.properties?.style) {
        if (Array.isArray(node.properties?.className) && node.properties?.className.includes('shiki')) {
          node.children.splice(0, 1);
        }
      }
    });
  };
};
export { rehypeShikiClear };
