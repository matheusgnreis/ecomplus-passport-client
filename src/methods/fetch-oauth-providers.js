import { passport } from '@ecomplus/client'
import createIframe from './../lib/create-iframe'

/**
 * @method
 * @name EcomPassport#fetchOauthProviders
 * @description Fetch Passport API to list OAuth providers and start social login flux.
 *
 * @param {boolean} [canAppendIframe=true] - Whether iframe should be appended to body
 * to start oauth flux
 *
 * @returns {Promise<data|error>}
 *
 * @example

ecomPassport.fetchOauthProviders()

 */

export default (self, emitter, [canAppendIframe = true]) => {
  const { storeId, sessionId } = self

  return passport({
    url: `${sessionId}/oauth-providers.json`,
    storeId
  }).then(({ data }) => {
    const { iframeUri } = data
    if (canAppendIframe) {
      createIframe(iframeUri)
    }
    self.oauthSessionUri = iframeUri
    return data
  })
}
