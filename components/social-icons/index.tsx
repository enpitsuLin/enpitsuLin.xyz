import { IconType } from 'react-icons'
import { FaQq, FaEnvelope, FaGithub, FaSteam, FaZhihu } from 'react-icons/fa'
import FaBilibili from './FaBilibili'

type SocialKind = 'mail' | 'github' | 'zhihu' | 'bilibili' | 'steam' | 'qq'

interface SocialIconProps {
  kind: SocialKind
  href: string
  size?: 'small' | 'medium' | 'large'
}

const components: Record<SocialKind, IconType> = {
  mail: FaEnvelope,
  github: FaGithub,
  zhihu: FaZhihu,
  bilibili: FaBilibili,
  steam: FaSteam,
  qq: FaQq,
}
const sizeMap = {
  small: `h-6 w-6`,
  medium: `h-8 w-8`,
  large: `h-12 w-12`,
}

const SocialIcon: React.FC<SocialIconProps> = ({ kind, href, size = 'medium' }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]
  const sizeClass = sizeMap[size]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={[
          `fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400`,
          sizeClass,
        ].join(' ')}
      />
    </a>
  )
}

export default SocialIcon
