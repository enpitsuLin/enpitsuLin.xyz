import { NextApiHandler } from 'next'
import faunadb from 'faunadb'
import dayjs from 'dayjs'

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

async function getWebsiteVisit() {
  const date = dayjs().format('YYYY-MM-DD')
  const isTodayExist = await isIndexExist('website_visit', date)

  if (!isTodayExist) await createCollection('website_visit', { date, count: 1 })

  const document = await getIndex('website_visit', date)

  await updateCollection(document.ref, { count: document.data.count + 1 })

  return document
}

async function getPostVisit(slug: string) {
  const isSlugExist = await isIndexExist('visit_by_slug', slug)

  if (!isSlugExist) await createCollection('post_visit_count', { slug, count: 1 })

  const document = await getIndex('visit_by_slug', slug)

  await updateCollection(document.ref, { count: document.data.count + 1 })

  return document
}

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string
  if (!slug) {
    const resWebsite = await getWebsiteVisit()
    return res.status(200).json({
      message: 'get website visit success',
      count: resWebsite.data.count,
    })
  }
  const resPost = await getPostVisit(slug)
  return res.status(200).json({
    message: 'get post visit success',
    count: resPost.data.count,
  })
}

export default handler
