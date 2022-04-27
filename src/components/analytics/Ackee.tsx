import Script from 'next/script'

import siteMetadata from 'data/siteMetadata'

const AckeeTracker = () => {
  return (
    <>
      <Script
        async
        src="https://ackee.enpitsulin.xyz/tracker.js"
        data-ackee-server="https://ackee.enpitsulin.xyz"
        data-ackee-domain-id={siteMetadata.analytics.ackeeDomainId}
        data-ackee-opts='{ "ignoreLocalhost": true }'
      ></Script>
    </>
  )
}

export default AckeeTracker
