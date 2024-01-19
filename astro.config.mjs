import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import Unocss from 'unocss/astro';

import rehypeRewrite from 'rehype-rewrite';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkCodeTitles from 'remark-flexible-code-titles';
import remarkEmoji from 'remark-emoji';

const remarkPlugins = [
  remarkEmoji,
  [
    remarkCodeTitles, {
      title: false,
      containerProperties: (lang, title) => ({
        ['data-language']: lang,
        ['data-title']: title
      })
    }
  ],
  remarkDirective,
  remarkDirectiveRehype
]
const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        ariaHidden: 'true',
        className: ["ml-2"]
      },
      content: {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['op-0', 'group-hover:op-80', 'i-ri:links-fill', 'w-4', 'h-4']
        }
      }
    }
  ],
  [
    rehypeRewrite, {
      rewrite: node => {
        if (node.type === 'element' && node.tagName === 'img') {
          node.properties = Object.assign(node.properties || {}, {
            'data-zoomable': true,
            loading: 'lazy'
          });
        }
        if (node.type === 'element' && ['h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
          node.properties = Object.assign(node.properties || {}, {
            className: 'group flex items-center'
          });
        }
      }
    }
  ]
]

export default defineConfig({
  site: 'https://enpitsulin.xyz',
  integrations: [mdx(), sitemap(), Unocss(), solidJs()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    },
    remarkPlugins,
    rehypePlugins
  },
  output: "server",
  adapter: node({ mode: "standalone" })
});
