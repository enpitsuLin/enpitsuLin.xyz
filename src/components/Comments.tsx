import React, { useEffect, useRef, useState } from 'react'
import 'disqusjs/dist/disqusjs.css'
import DisqusJS from 'disqusjs'
import { PostFrontMatter } from '@/types/PostFrontMatter'

const Comments: React.FC<{ frontMatter: PostFrontMatter }> = ({ frontMatter }) => {
  const comments = useRef<HTMLDivElement>()

  const COMMENTS_ID = 'disqus_thread'

  function LoadComments() {
    const disqus = new DisqusJS({
      shortname: 'enpitsulin',
      siteName: `enpitsulin's blog`,
      api: 'https://disqusjs.enpitsulin.xyz/',
      apikey: process.env.NEXT_PUBLIC_DISQUS_APIKEY,
    })
  }
  useEffect(() => {
    const ele = comments.current
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          LoadComments()
          observer.disconnect()
        }
      },
      { threshold: [0] }
    )
    observer.observe(ele)
  }, [])

  return (
    <div ref={comments} className="min-h-8 pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <div className="disqus-frame" id={COMMENTS_ID} style={{ colorScheme: 'light' }} />
    </div>
  )
}

export default Comments
