import { getPosts } from '../lib/sanity';
import { Post } from '../lib/types';
import { OnBeforeRenderServer } from '../renderer/types';

export interface Props {
  posts: Omit<Post, 'content'>[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async () => {
  let posts = await getPosts();

  return {
    pageContext: {
      pageProps: {
        posts,
        pagination: { currentPage: 1, totalPages: Math.ceil(posts.length / 5) }
      }
    }
  };
};
