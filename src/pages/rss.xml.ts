import rss from '@astrojs/rss';
import { usePosts } from '~/lib/sanity';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import type { APIRoute } from 'astro';

export const get: APIRoute = async (context) => {
  const posts = await usePosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site?.toString() ?? '',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      link: `/blog/${post.slug}/`
    }))
  });
};
