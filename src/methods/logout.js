import emitter from './../lib/emitter'
import setCookie from './../lib/set-cookie'

export default self => {
  // just clears current session and cookie
  self.session = {}
  setCookie(self.cookieName, -1)
  // emit logou event
  emitter.emit('logout')
}
