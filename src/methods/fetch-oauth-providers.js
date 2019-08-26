import { passport } from '@ecomplus/client'
import createIframe from './../lib/create-iframe'

export default (self, setupIframe = true) => passport({
  url: `${self.sessionId}/oauth-providers.json`,
  storeId: self.storeId
})
  .then(({ data }) => {
    if (setupIframe) {
      // oauth session iframe to create cookies
      const { iframeUri } = data
      createIframe(iframeUri)
    }
    return data
  })
