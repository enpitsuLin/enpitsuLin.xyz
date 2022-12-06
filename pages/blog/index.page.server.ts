import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import remarkStringify from 'remark-stringify';
import remarkCodeTitle from '../../lib/remark-code-title';

import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { getClient, indexQuery, postQuery } from '../../lib/sanity';

export interface PageProps {}

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const slug = pageContext.routeParams.slug;
  const data = await getClient().fetch(postQuery, { slug });
  const content = data.content;
  const file = await remark()
    .use(remarkParse)
    .use(remarkStringify)
    .use([
      [remarkCodeTitle],
      [remarkGfm],
      [
        //@ts-ignore
        import.meta.env.PROD ? remarkShikiTwoslash.default : remarkShikiTwoslash,
        { themes: ['dark-plus', 'light-plus'] }
      ]
      // ...
    ])
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { properties: { className: ['anchor'] } })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  return {
    pageContext: {
      pageProps: {
        slug,
        html: file.toString()
      }
    }
  };
}

export async function prerender() {
  const data = await getClient().fetch(indexQuery);
  return data.map((item: any) => '/blog/' + item.slug);
}
