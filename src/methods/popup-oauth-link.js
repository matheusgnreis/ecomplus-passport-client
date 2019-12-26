import createPopup from './../lib/create-popup'

/**
 * @method
 * @name EcomPassport#popupOauthLink
 * @description Open a new popup to received URL for OAuth and
 * try to fetch profile on callback or popup closed.
 *
 * @param {string} url - Popup URL (OAuth provider link)
 *
 * @returns {window|null}
 *
 * @example

ecomPassport.popupOauthLink(facebookOauthLink)

 */

export default ({ fetchOauthProfile }, emitter, [url]) => {
  let popupWatch = null

  const getCustomerInfo = fromCallback => {
    clearInterval(popupWatch)
    fetchOauthProfile()
  }

  window.passportCallback = function () {
    getCustomerInfo(true)
  }

  const popup = createPopup(url)
  if (popup) {
    if (typeof window === 'object' && window.focus) {
      popup.focus()
    }
    popupWatch = setInterval(() => {
      if (popup.closed) {
        getCustomerInfo(false)
      }
    }, 400)
  }

  return popup
}
