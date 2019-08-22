import emitter from './../lib/emitter'
import setCookie from './../lib/set-cookie'

export default self => {
  // just clears current session and cookie
  self.session = {}
  const { document, cookieName } = self
  setCookie(document, cookieName, '', -1)
  // emit logou event
  emitter.emit('logout')
}
