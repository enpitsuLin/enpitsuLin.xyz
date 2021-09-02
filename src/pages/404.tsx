import * as React from "react"
import { graphql, PageRendererProps, useStaticQuery } from "gatsby"

import Layout from "../components/Layout/"
import Seo from "../components/seo"

type Props = PageRendererProps

const NotFoundPage: React.FC<Props> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage
