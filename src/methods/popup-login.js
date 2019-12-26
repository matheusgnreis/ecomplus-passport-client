/**
 * @method
 * @name EcomPassport#popupLogin
 * @description Open a new popup to default E-Com Plus Passport login window.
 *
 * @returns {window|null}
 *
 * @example

ecomPassport.popupLogin()

 */

export default (
  { storeId, lang, sessionId, popupOauthLink },
  emitter,
  [canSkipLogin, baseUri = 'https://passport.e-com.plus/v1/']
) => {
  let url = `${baseUri}${lang}/${storeId}/${sessionId}/login.html`
  if (canSkipLogin) {
    url += '?enable_skip=true'
  }
  return popupOauthLink(url)
}
