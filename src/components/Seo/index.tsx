/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Prop {
  description?: string
  lang?: string
  meta?: { name: string; content: string }[]
  title: string
}

const Seo: React.FunctionComponent<Prop> = props => {
  const { description, lang, meta, title } = props
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const defaultMeta = [
    { name: `description`, content: metaDescription },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: `website` },
    { name: `twitter:card`, content: `summary` },
    { name: `twitter:creator`, content: site.siteMetadata?.author || `` },
    { name: `twitter:title`, content: title },
    { name: `twitter:description`, content: metaDescription },
  ]
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={defaultMeta.concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `zh-Hans`,
  meta: [],
  description: ``,
}

export default Seo
