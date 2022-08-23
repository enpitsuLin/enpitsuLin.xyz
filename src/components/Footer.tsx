import Link from './Link'
import siteMetadata from 'data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useEffect, useState } from 'react'
export default function Footer() {
  const [year, setYear] = useState<number>()
  useEffect(() => {
    const curYear = new Date().getFullYear()
    setYear(curYear)
  }, [])
  return (
    <footer>
      <div className="mt-16 mb-6 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="qq" href={siteMetadata.qq} size="small" />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="small" />
          <SocialIcon kind="github" href={siteMetadata.github} size="small" />
          <SocialIcon kind="bilibili" href={siteMetadata.bilibili} size="small" />
          <SocialIcon kind="steam" href={siteMetadata.steam} size="small" />
          <SocialIcon kind="zhihu" href={siteMetadata.zhihu} size="small" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/">{siteMetadata.author}</Link>
          <div>{` • `}</div>
          <div>{`© ${year}`}</div>
          <div>{` • `}</div>
          <Link href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Powered by <Link href="https://nextjs.org/">Nextjs</Link> Theme with{' '}
          <Link href="https://windicss.org/">Windicss</Link>
        </div>
      </div>
    </footer>
  )
}
