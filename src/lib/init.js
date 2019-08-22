export default self => {
  const { document, cookieName } = self
  // try to get session from cookie
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(cookieName) === 0) {
      // found cookie
      const sessionJson = c.substring(cookieName.length, c.length)
      try {
        self.session = JSON.parse(sessionJson)
        if (typeof self.session === 'object' && self.session !== null && !Array.isArray(self.session)) {
          // ok
          return
        }
      } catch (e) {
        // invalid cookie value
      }
      // reset
      self.session = {}
      return
    }
  }
}
