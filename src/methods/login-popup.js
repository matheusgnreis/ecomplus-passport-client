export default (self, enableSkip) => {
  self.makeId()
  let uri = `${self.baseUri}${self.lang}/${self.storeId}/${self.reqId}/login.html`
  const screen = typeof window === 'object' && window.screen
  if (enableSkip) {
    // shows link to skip social login
    uri += '?enable_skip=true'
  }
  let width
  if (screen) {
    // set window width based on screen width
    if (screen.width >= 640) {
      width = 640
    } else {
      width = screen.width
    }
  } else {
    width = 380
  }

  // open new browser window
  const popup = window.open(uri, 'Passport', `height=500,width=${width}`)
  if (popup) {
    if (width.focus) {
      popup.focus()
    }
    const getCustomerInfo = function (fromCallback) {
      // run after login
      clearInterval(popupWatch)
      // store customer public info and authentication session
      self.getSession()
    }
    // public callback function
    window.passportCallback = function () {
      // logged
      getCustomerInfo(true)
    }
    // fallback
    const popupWatch = setInterval(function () {
      if (popup.closed) {
        // may be logged
        getCustomerInfo(false)
        self.getOAuthSession()
        // if logged set authentication level
        if (self.getSession()) {
          self.authLevel = 3
        }
      }
    }, 400)
  }
}
