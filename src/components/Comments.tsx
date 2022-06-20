import React, { useEffect, useRef } from 'react'
import DisqusJS from 'disqusjs'
import { PostFrontMatter } from '@/types/PostFrontMatter'

const Comments: React.FC<React.PropsWithChildren<{ frontMatter: PostFrontMatter }>> = ({ frontMatter }) => {
  const comments = useRef<HTMLDivElement>()

  const COMMENTS_ID = 'disqus_thread'

  function initDisqus() {
    const disqus = new DisqusJS({
      url: document.location.origin + document.location.pathname + document.location.search,
      identifier: frontMatter.slug,
      shortname: 'enpitsulin',
      siteName: `enpitsulin's blog`,
      api: 'https://disqusjs.enpitsulin.xyz/',
      apikey: process.env.NEXT_PUBLIC_DISQUS_APIKEY,
    })
    return disqus
  }
  useEffect(() => {
    let disqus = initDisqus()
    const ele = comments.current
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          disqus.render(comments.current)
          observer.disconnect()
        }
      },
      { threshold: [0] }
    )
    observer.observe(ele)
    return () => {
      disqus.destroy()
      observer.unobserve(ele)
    }
  }, [])

  return (
    <div
      ref={comments}
      id="comment"
      className="min-h-8 pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
    >
      <div className="disqus-frame" id={COMMENTS_ID} style={{ colorScheme: 'light' }} />
    </div>
  )
}

export default Comments
