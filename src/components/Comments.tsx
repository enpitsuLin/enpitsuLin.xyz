import { Post } from '@/types'
import DisqusJS from 'disqusjs'
import React, { useEffect, useRef } from 'react'

const Comments: React.FC<{ post: Post }> = ({ post }) => {
  const comments = useRef<HTMLDivElement>()

  function initDisqus() {
    const disqus = new DisqusJS({
      url: document.location.origin + document.location.pathname + document.location.search,
      identifier: post.slug,
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
      style={{ colorScheme: 'light' }}
    ></div>
  )
}

export default Comments
