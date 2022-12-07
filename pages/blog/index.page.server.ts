import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import remarkStringify from 'remark-stringify';
import remarkCodeTitle from '../../lib/remark-code-title';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

import { getPost, getPosts } from '~/lib/sanity';
import { OnBeforeRenderServer } from '~/renderer/types';
import { RenderErrorPage } from 'vite-plugin-ssr';

export interface Props {
  slug: string;
  html: string;
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async (pageContext: PageContextBuiltIn) => {
  const slug = pageContext.routeParams.slug;
  const data = await getPost(slug);
  if (!data) throw RenderErrorPage({ pageContext: { is404: true } });

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
};

export async function prerender() {
  const data = await getPosts();
  return data.map((item: any) => '/blog/' + item.slug);
}
