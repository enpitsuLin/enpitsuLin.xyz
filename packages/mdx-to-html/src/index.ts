import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
//
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeKatex from 'rehype-katex'
import rehypePrismDiff from 'rehype-prism-diff'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

interface Options {
  remarkPlugins?: any[]
}

export async function mdxToHtml(source: string, target: Record<string, any>, option?: Options) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        ...(option.remarkPlugins ?? []),
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypeKatex,
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

  target.html = mdxSource
  target.wordCount = source.split(/\s+/gu).length
  target.readingTime = Math.round(readingTime(source).minutes).toString()
  return target
}

export * from 'next-mdx-remote'
