import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'
import siteMetadata from 'data/siteMetadata'

const Comments: React.FC<{ mapping: string }> = ({ mapping }) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)

  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.darkTheme
        : siteMetadata.comment.theme
      : siteMetadata.comment.themeURL

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)

    const { repo, repositoryId, category, categoryId, reactions, metadata, inputPosition, lang } =
      siteMetadata.comment

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repositoryId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-reactions-enabled', reactions)
    script.setAttribute('data-emit-metadata', metadata)
    script.setAttribute('data-input-position', inputPosition)
    script.setAttribute('data-lang', lang)
    script.setAttribute('data-theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)

    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [commentsTheme, mapping])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    if (!iframe) return
    LoadComments()
  }, [LoadComments])

  return (
    <div id="comment">
      <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
        {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>}
        <div className="giscus" id={COMMENTS_ID} />
      </div>
    </div>
  )
}

export default Comments
