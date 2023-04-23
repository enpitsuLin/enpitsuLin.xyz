import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro';

// https://astro.build/config
import solidJs from '@astrojs/solid-js';


import rehypePrismDiff from 'rehype-prism-diff';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeRewrite from 'rehype-rewrite';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkCodeTitles from 'remark-flexible-code-titles';
import rehypeSlug from 'rehype-slug';
import { toc } from 'mdast-util-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://enpitsulin.xyz',
  integrations: [mdx(), sitemap(), Unocss(), solidJs()],
  markdown: {
    gfm: true,
    syntaxHighlight: false,
    remarkPlugins: [
      [
        remarkCodeTitles, {
          title: false,
          containerProperties: (lang, title) => ({
            ['data-language']: lang,
            ['data-title']: title
          })
        }
      ],
      () => (tree, file) => {
        file.data.astro.frontmatter.toc = toc(tree, { tight: true, ordered: true })
      },
      remarkDirective, remarkDirectiveRehype],
    rehypePlugins: [
      rehypePrismPlus, rehypePrismDiff, rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          ariaHidden: 'true',
          tabIndex: -1,
          class: 'absolute -left-6'
        },
        content: {
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['op-0', 'group-hover:op-100']
          },
          children: [
            {
              type: 'text',
              value: '#'
            }
          ]
        }
      }],
      [rehypeRewrite, {
        rewrite: (node) => {
          if (node.type === 'element' && node.tagName === 'img') {
            node.properties = Object.assign(node.properties || {}, {
              'data-zoomable': true,
              loading: 'lazy'
            });
          }
          if (
            node.type === 'element' &&
            ['h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)
          ) {
            node.properties = Object.assign(node.properties || {}, {
              className: 'group'
            });
          }
        }
      }],
    ]
  }
});
