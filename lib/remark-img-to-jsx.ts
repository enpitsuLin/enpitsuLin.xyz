import { Image, Root } from 'mdast';
import { Plugin } from 'unified';
import { Parent, visit } from 'unist-util-visit';

const remarkImgToJsx: Plugin<[], Root> = () => (root) => {
  visit(root, 'image', (node: Image, index: number | null, parent: Parent | null) => {
    const { alt = null, url } = node;
    if (alt && alt.includes('|')) {
      const [title, attr] = alt.split('|')!;
      const [width, height] = attr.split('x')!;
      const jsxNode = {
        type: 'mdxJsxFlowElement',
        name: 'Image',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'alt', value: title },
          { type: 'mdxJsxAttribute', name: 'src', value: url },
          { type: 'mdxJsxAttribute', name: 'width', value: width },
          { type: 'mdxJsxAttribute', name: 'height', value: height }
        ]
      };
      parent!.children.splice(index!, 1, jsxNode);
    }
  });
};

export default remarkImgToJsx;
