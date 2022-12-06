import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import remarkStringify from 'remark-stringify';
import remarkCodeTitle from '../../lib/remark-code-title';
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
      [remarkShikiTwoslash, { theme: 'dark-plus' }]
      // ...
    ])
    .use(remarkRehype, { allowDangerousHtml: true })
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
