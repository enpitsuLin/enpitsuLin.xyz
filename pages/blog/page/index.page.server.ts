import { getPosts } from '~/lib/sanity';
import { Post } from '~/lib/types';
import { OnBeforeRenderServer } from '~/renderer/types';

export interface Props {
  posts: Omit<Post, 'content'>[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  initialDisplayPosts: Omit<Post, 'content'>[];
}

export const onBeforeRender: OnBeforeRenderServer<Props> = async (context) => {
  const currentPage = Number(context.routeParams.page);
  let posts = await getPosts();
  const totalPages = Math.ceil(posts.length / 5);
  const pagination = { currentPage, totalPages };
  const initialDisplayPosts = posts.slice(5 * (currentPage - 1), 5 * currentPage);

  return {
    pageContext: {
      pageProps: {
        posts,
        pagination,
        initialDisplayPosts
      }
    }
  };
};

export async function prerender() {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / 5);
  return Array.from({ length: totalPages }, (_, i) => `/blog/page/${i}`);
}
