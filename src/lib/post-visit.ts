import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

async function isIndexExist(index: string, ...query: (string | number)[]) {
  return client.query(q.Exists(q.Match(q.Index(index), ...query)))
}

async function getIndex<T = any>(index: string, ...data: any[]) {
  return client.query<{ ref: string; ts: number; data: T }>(q.Get(q.Match(q.Index(index), ...data)))
}

async function createCollection<T = any>(name: string, data: T) {
  return client.query(q.Create(q.Collection(name), { data }))
}

async function updateCollection<T = any>(ref: string, data: T) {
  if (process.env.NODE_ENV === 'production') return client.query(q.Update(ref, { data }))
  return void 0
}

export async function getAllVisit() {
  const { data } = await client.query<{ ref: string; ts: number; data: any[] }>(
    q.Paginate(q.Match(q.Index('all_visit')))
  )

  const ret = []
  for await (let item of data) {
    const res = await client.query<{ ref: string; ts: number; data: any[] }>(q.Get(item))
    ret.push(res.data)
  }
  return ret
}

export async function getVisitBySlug(slug: string) {
  const isSlugExist = await isIndexExist('visit_by_slug', slug)

  if (!isSlugExist) await createCollection('post_visit_count', { slug, count: 1 })

  const document = await getIndex('visit_by_slug', slug)

  return document
}

export async function updateVisit(document: { ref: string; ts: number; data: any }) {
  await updateCollection(document.ref, { count: document.data.count + 1 })
}
