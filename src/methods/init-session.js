import emitter from './../lib/emitter'
import getCookie from './../lib/get-cookie'

export default self => {
  const { document, cookieName, getCustomerName } = self

  // try to get session from cookie
  const sessionJson = getCookie(document, cookieName)
  if (sessionJson) {
    try {
      self.session = JSON.parse(sessionJson)
    } catch (e) {
      // invalid cookie value
    }
  }

  const { session } = self
  if (typeof session !== 'object' || session === null || Array.isArray(session)) {
    // reset session object
    self.session = {}
  } else if (getCustomerName()) {
    emitter.emit('logged', (session.auth && session.auth.level) || 1)
  }

  // generate random 32 bytes string
  self.sessionId = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    self.sessionId += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return self
}
