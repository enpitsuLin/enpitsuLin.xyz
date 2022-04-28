import { getVisitBySlug, updateVisit } from '@/lib/post-visit'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string
  const document = await getVisitBySlug(slug)
  await updateVisit(document)
  res.status(200).json({
    message: 'get post visit success',
    count: document.data.count,
  })
}

export default handler
