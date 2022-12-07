import { getTags, getPosts } from '~/lib/sanity';
import { Post } from '~/lib/types';
import { OnBeforeRenderServer } from '~/renderer/types';

export interface Props {
  tag: string;
  posts: Omit<Post, 'content'>[];
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async (pageContext) => {
  const posts = await getPosts();
  const tag = pageContext.routeParams.tag;
  return {
    pageContext: {
      pageProps: { tag, posts: posts.filter((post) => post.tags.includes(tag)) }
    }
  };
};

export const prerender = async () => {
  const tags = await getTags();
  return Object.keys(tags).map((tag) => ({ url: `/tags/${tag}` }));
};
