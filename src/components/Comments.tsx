import React, { useState } from 'react'
import 'disqusjs/dist/disqusjs.css'
import DisqusJS from 'disqusjs'
import siteMetadata from 'data/siteMetadata'
import { PostFrontMatter } from '@/types/PostFrontMatter'

const Comments: React.FC<{ frontMatter: PostFrontMatter }> = ({ frontMatter }) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)

  const COMMENTS_ID = 'disqus_thread'

  function LoadComments() {
    setEnabledLoadComments(false)
    const disqus = new DisqusJS({
      shortname: 'enpitsulin',
      siteName: 'enpitsulin',
      api: 'https://disqus.skk.moe/disqus/',
      apiKey: siteMetadata.comment.apikey,
    })
  }

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>}
      <div className="disqus-frame" id={COMMENTS_ID} />
    </div>
  )
}

export default Comments
