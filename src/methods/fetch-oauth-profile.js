import { passport } from '@ecomplus/client'

/**
 * @method
 * @name EcomPassport#fetchOauthProfile
 * @description Try get session and account data after social login.
 *
 * @returns {Promise<session|error>}
 *
 * @example

ecomPassport.fetchOauthProfile().then(() => {
  console.log(ecomPassport.checkVerification() === true)
})

 */

export default ({ storeId, sessionId, setSession }) => passport({
  url: `${sessionId}/token.json`,
  storeId
}).then(({ data }) => {
  setSession(data)
  return data
})
