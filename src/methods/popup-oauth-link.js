import createPopup from './../lib/create-popup'

export default (self, url) => {
  let popupWatch = null

  const getCustomerInfo = fromCallback => {
    // run after login
    clearInterval(popupWatch)
    // store customer public info and authentication session
    self.fetchOauthProfile()
  }

  // public callback function
  window.passportCallback = function () {
    // logged
    getCustomerInfo(true)
  }

  const popup = createPopup(url)
  if (popup) {
    if (typeof window === 'object' && window.focus) {
      popup.focus()
    }
    // close fallback
    popupWatch = setInterval(() => {
      if (popup.closed) {
        // may be logged
        getCustomerInfo(false)
      }
    }, 400)
  }

  return popup
}
