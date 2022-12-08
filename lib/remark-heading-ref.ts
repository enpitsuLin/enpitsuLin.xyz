import type { Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { kebabCase } from './kebab-case';
import type * as mdast from 'mdast';
import type * as unified from 'unified';
import type * as unist from 'unist';

interface HeadingRefOption {
  exportRef?: any[];
}

const remarkHeadingsRef: unified.Plugin<[HeadingRefOption?], mdast.Root> = (options = {}) => {
  return (tree: Parent) =>
    visit(tree, 'heading', (node: mdast.Heading) => {
      const textContent = toString(node);
      options.exportRef?.push({
        value: textContent,
        url: '#' + kebabCase(textContent),
        depth: node.depth
      });
    });
};

export default remarkHeadingsRef;

function toString(node: unist.Node): string {
  if (isParent(node)) return node.children.map((child) => toString(child)).join('');
  if (isValue(node)) return node.value;
  return '';
}

function isParent(node: unist.Node): node is mdast.Parent {
  return 'children' in node;
}

function isValue(node: unist.Node): node is mdast.Literal {
  return 'value' in node;
}
