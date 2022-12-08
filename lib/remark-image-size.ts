import { Image, Root } from 'mdast';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const remarkImageSize: Plugin<[], Root> = () => (root) => {
  visit(root, 'image', (node: Image) => {
    const { alt = null } = node;
    if (alt && alt.includes('|')) {
      const [width, height] = alt.match(/(\d+x\d+)$/)?.[1].split('x')!;
      //@ts-expect-error
      node.attributes = { width, height };
    }
  });
};

export default remarkImageSize;
