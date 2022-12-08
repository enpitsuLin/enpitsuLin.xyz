import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

import remarkGfm from 'remark-gfm';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import remarkImgToJsx from '~/lib/remark-img-to-jsx';
import remarkCodeTitle from '../../lib/remark-code-title';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import { RenderErrorPage } from 'vite-plugin-ssr';
import { getPost, getPosts, getPostSlugs } from '~/lib/sanity';
import { OnBeforeRenderServer } from '~/renderer/types';

import { bundleMDX } from 'mdx-bundler';
import remarkHeadingsRef from '~/lib/remark-heading-ref';
import { Post, Heading } from '~/lib/types';

export interface Props {
  post: Post;
  toc: Heading[];
  code: string;
  prev?: Pick<Post, 'slug' | 'title'>;
  next?: Pick<Post, 'slug' | 'title'>;
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async (pageContext: PageContextBuiltIn) => {
  const slug = pageContext.routeParams.slug;
  const data = await getPost(slug);
  if (!data) throw RenderErrorPage({ pageContext: { is404: true } });
  const slugs = await getPostSlugs();
  const postIndex = slugs.findIndex((item) => item.slug === slug);
  const prev = slugs[postIndex + 1] ?? undefined;
  const next = slugs[postIndex - 1] ?? undefined;

  const content = data.content;
  const toc: Heading[] = [];

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
        [remarkHeadingsRef, { exportRef: toc }],
        remarkImgToJsx
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
        toc,
        code: result.code,
        prev,
        next
      }
    }
  };
};

export async function prerender() {
  const data = await getPosts();
  return data.map((item: any) => '/blog/' + item.slug);
}
