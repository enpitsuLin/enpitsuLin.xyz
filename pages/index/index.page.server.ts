import { getPosts } from '../../lib/sanity';
import { Post } from '../../lib/types';
import { OnBeforeRenderServer } from '../../renderer/types';

export interface Props {
  posts: Omit<Post, 'content'>[];
  showMore: boolean;
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async () => {
  const posts = await getPosts();

  return {
    pageContext: {
      pageProps: {
        posts: posts.slice(0, 3),
        showMore: posts.length > 3
      }
    }
  };
};
