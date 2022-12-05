import { Toc } from '@/types'
import { mdxToHtml as rawToHtml } from 'mdx-to-html'
import remarkImgToJsx from './remark-img-to-jsx'
import remarkTocHeadings from './remark-toc-headings'

export async function mdxToHtml(source: string) {
  const toc: Toc = []
  const ret = { toc }
  await rawToHtml(source, ret, {
    remarkPlugins: [[remarkTocHeadings, { exportRef: toc }], remarkImgToJsx],
  })

  return ret
}
