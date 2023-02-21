import { createClient } from '@sanity/client';
import { q, makeSafeQueryRunner } from 'groqd';
export const createQueryRunner = () => {
  const client = createClient({
    projectId: 'r9a6ysjd',
    dataset: 'production',
    token: import.meta.env.VITE_SANITY_TOKEN,
    useCdn: true,
    apiVersion: '2022-01-12'
  });
  return makeSafeQueryRunner((query, params: Record<string, unknown> = {}) =>
    client.fetch(query, params)
  );
};

export const usePost = (slug: string) => {
  const query = q('*')
    .filter("_type == 'post' && slug.current == $slug")
    .grab({
      id: ['_id', q.string()],
      title: q.string(),
      date: q.string(),
      summary: q.string(),
      tags: q.array(q.string()),
      slug: ['slug.current', q.string()],
      content: q.string(),
      draft: ["_id in path('drafts.**')", q.boolean()]
    })
    .slice(0)
    .nullable();

  const runQuery = createQueryRunner();
  return runQuery(query, { slug });
};

export const usePosts = (opt?: { limit?: number; skip?: number }) => {
  let basisQuery = q('*')
    .filter("_type == 'post' && !(_id in path('drafts.**'))")
    .order('date desc');

  if (typeof opt?.limit !== 'undefined') {
    const { skip = 0, limit } = opt;
    basisQuery = basisQuery.slice(skip, skip + limit - 1);
  }

  const query = basisQuery.grab({
    id: ['_id', q.string()],
    title: q.string(),
    date: q.string(),
    summary: q.string(),
    tags: q.array(q.string()),
    slug: ['slug.current', q.string()]
  });
  const runQuery = createQueryRunner();
  return runQuery(query);
};

export const usePostsCount = async () => {
  const query = q('*')
    .filter("_type == 'post' && !(_id in path('drafts.**'))")
    .grab({ id: ['_id', q.string()] });
  const runQuery = createQueryRunner();
  return runQuery(query).then((res) => res.length);
};
