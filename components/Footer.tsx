import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="qq" href={siteMetadata.qq} size="small" />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="small" />
          <SocialIcon kind="github" href={siteMetadata.github} size="small" />
          <SocialIcon kind="bilibili" href={siteMetadata.bilibili} size="small" />
          <SocialIcon kind="steam" href={siteMetadata.steam} size="small" />
          <SocialIcon kind="zhihu" href={siteMetadata.zhihu} size="small" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
