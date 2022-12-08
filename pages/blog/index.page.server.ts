import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

import remarkGfm from 'remark-gfm';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import remarkImageSize from '~/lib/remark-image-size';
import remarkCodeTitle from '../../lib/remark-code-title';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import { RenderErrorPage } from 'vite-plugin-ssr';
import { getPost, getPosts } from '~/lib/sanity';
import { OnBeforeRenderServer } from '~/renderer/types';

import { bundleMDX } from 'mdx-bundler';
import { Post } from '~/lib/types';

export interface Props {
  post: Post;
  code: string;
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async (pageContext: PageContextBuiltIn) => {
  const slug = pageContext.routeParams.slug;
  const data = await getPost(slug);
  if (!data) throw RenderErrorPage({ pageContext: { is404: true } });

  const content = data.content;

  const result = await bundleMDX({
    source: content,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkCodeTitle,
        remarkGfm,
        [
          //@ts-ignore
          import.meta.env.PROD ? remarkShikiTwoslash.default : remarkShikiTwoslash,
          { themes: ['dark-plus', 'light-plus'] }
        ],
        remarkImageSize
      ];
      options.rehypePlugins = [
        [rehypeRaw, { passThrough: [`mdxJsxFlowElement`, `mdxJsxTextElement`] }],
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings
      ];
      return options;
    }
  });

  return {
    pageContext: {
      pageProps: {
        post: data,
        code: result.code
      }
    }
  };
};

export async function prerender() {
  const data = await getPosts();
  return data.map((item: any) => '/blog/' + item.slug);
}
