import * as React from "react"
import { Link } from "gatsby"

interface Props {
  siteTitle?: string
}

const Header: React.FunctionComponent<Props> = props => {
  const { siteTitle } = props
  return (
    <header id="header">
      <div className="site-name">
        <h1 className="hidden">{siteTitle}</h1>
        <a id="logo" href="/.">
          {siteTitle}
        </a>
        <p className="description">{siteTitle}</p>
      </div>
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
