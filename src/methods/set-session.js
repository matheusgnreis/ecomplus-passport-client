import emitter from './../lib/emitter'
import setCookie from './../lib/set-cookie'

export default (self, session) => {
  if (typeof session !== 'object' || session === null || Array.isArray(session)) {
    // session must be an object
    session = {}
  }
  self.session = session
  const { document, cookieName, getCustomerName } = self
  setCookie(document, cookieName, JSON.stringify(session), 6)
  if (getCustomerName()) {
    // emit login event
    emitter.emit('login', (session.auth && session.auth.level) || 1)
  }
  return self
}
