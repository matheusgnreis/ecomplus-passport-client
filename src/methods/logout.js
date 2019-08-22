import emitter from './../lib/emitter'

export default (self, document) => {
  // just clears current session and cookie
  self.session = {}
  document.cookie = self.cookieName + '"null"'
  self.authLevel = 0
  emitter.emit('logout')
}
