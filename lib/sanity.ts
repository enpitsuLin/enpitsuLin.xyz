import sanityClient from '@sanity/client';
import { format } from 'date-fns';
import { Post } from './types';

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: import.meta.env.DEV,
  apiVersion: '2021-03-25'
};

export const client = sanityClient(config);

export const previewClient = sanityClient({
  ...config,
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN
});

export const getClient = (preview?: boolean) => (preview ? previewClient : client);

const postFields = `
  _id,
  title,
  date,
  summary,
  tags,
  "slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = `
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  content,
  ${postFields}
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const postUpdatedQuery = `*[_type == "post" && _id == $id].slug.current`;

export async function getPost(slug: string, preview = false) {
  const post = await getClient(preview).fetch<Post>(postQuery, {
    slug
  });
  return { ...post, date: format(new Date(post.date), 'yyyy/MM/dd HH:mm') };
}

export async function getPosts(preview = false) {
  const posts = await getClient(preview).fetch<Omit<Post, 'content'>[]>(indexQuery);
  return posts.map((post) => ({ ...post, date: format(new Date(post.date), 'yyyy/MM/dd HH:mm') }));
}

/**
 * get all tags count map
 */
export async function getTags(preview = false) {
  const posts = await getPosts(preview);
  return posts
    .map((item) => item.tags)
    .flat()
    .reduce((map, tag) => ({ ...map, [tag]: tag in map ? map[tag] + 1 : 1 }), {} as Record<string, number>);
}
