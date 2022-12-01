import _Link from 'next/link'

const Link = ({ href, ...rest }: typeof _Link.defaultProps) => {
  href = typeof href === 'object' ? href.toString() : href

  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <_Link href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default Link
