import { passport } from '@ecomplus/client'
import createIframe from './../lib/create-iframe'

/**
 * @method
 * @name EcomPassport#fetchOauthProviders
 * @description Fetch Passport API to list OAuth providers and start social login flux.
 *
 * @returns {Promise<data|error>}
 *
 * @example

ecomPassport.fetchOauthProviders()

 */

export default ({ storeId, sessionId }, emitter, [canAppendIframe = true]) => passport({
  url: `${sessionId}/oauth-providers.json`,
  storeId
}).then(({ data }) => {
  if (canAppendIframe) {
    const { iframeUri } = data
    createIframe(iframeUri)
  }
  return data
})
