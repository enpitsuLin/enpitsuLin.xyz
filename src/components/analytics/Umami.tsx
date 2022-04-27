import Script from 'next/script'

import siteMetadata from 'data/siteMetadata'

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={siteMetadata.analytics.umamiWebsiteId}
        src="http://umami.enpitsulin.xyz/umami.js" // Replace with your umami instance
      />
    </>
  )
}

export default UmamiScript
