import { NextApiHandler } from 'next'
import faunadb from 'faunadb'
import dayjs from 'dayjs'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

async function getFaunadbIndex<T = any>(index: string, ...data: any[]) {
  return client.query<{ ref: string; ts: number; data: T }>(q.Get(q.Match(q.Index(index), ...data)))
}

async function getWebsiteVisit() {
  const date = dayjs().format('YYYY-MM-DD')
  const isTodayExist = await client.query(q.Exists(q.Match(q.Index('website_visit'), date)))
  if (!isTodayExist) {
    await client.query(
      q.Create(q.Collection('post_visit_count'), {
        data: {
          date,
          count: 0,
        },
      })
    )
  }
  const document = await getFaunadbIndex('website_visit', date)
  await client.query(
    q.Update(document.ref, {
      data: {
        count: document.data.count + 1,
      },
    })
  )
  return document
}

async function getPostVisit(slug: string) {
  const isSlugExist = await client.query(q.Exists(q.Match(q.Index('visit_by_slug'), slug)))

  if (!isSlugExist) {
    await client.query(
      q.Create(q.Collection('post_visit_count'), {
        data: {
          slug,
          count: 0,
        },
      })
    )
  }

  const document = await getFaunadbIndex('visit_by_slug', slug)

  await client.query(
    q.Update(document.ref, {
      data: {
        count: document.data.count + 1,
      },
    })
  )
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
