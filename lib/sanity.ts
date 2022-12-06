import sanityClient from '@sanity/client';

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: import.meta.env.NODE_ENV !== 'production',
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

export function getPost(slug: string, preview = false) {
  return getClient(preview).fetch(postQuery, {
    slug
  });
}
