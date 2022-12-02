import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkImgToJsx from './remark-img-to-jsx'
//
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismDiff from 'rehype-prism-diff'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkTocHeadings from './remark-toc-headings'
import { Toc } from '@/types'

export async function mdxToHtml(source: string) {
  const toc: Toc = []
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [remarkTocHeadings, { exportRef: toc }],
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypeKatex,
        rehypePresetMinify,
        [rehypePrismPlus, { ignoreMissing: true }],
        [rehypePrismDiff, {}],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
  })

  return {
    toc,
    html: mdxSource,
    wordCount: source.split(/\s+/gu).length,
    readingTime: Math.round(readingTime(source).minutes).toString(),
  }
}
