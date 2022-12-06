import { visit } from 'unist-util-visit';
import type * as mdast from 'mdast';
import type * as unified from 'unified';

const remarkCodeTitle: unified.Plugin<[], mdast.Root> = () => {
  return (tree, file) => {
    return visit(tree, 'code', (node, index, parent) => {
      const nodeLang = node.lang || '';
      let language = '';
      let title = '';

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'));
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length);
      }

      if (!title) {
        return;
      }
      const className = 'remark-code-title';

      const titleNode: mdast.Paragraph = {
        type: 'paragraph',
        data: { hName: 'div', hProperties: { className } },
        children: [{ type: 'text', value: title }]
      };
      //@ts-ignore
      parent.children.splice(index, 0, titleNode);
      node.lang = language;
    });
  };
};
export default remarkCodeTitle;
