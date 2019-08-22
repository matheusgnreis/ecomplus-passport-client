import emitter from './../lib/emitter'

export default (self, localStorage, storageKey, data) => {
  if (typeof data === 'object' && data !== null) {
    // set global
    self.session = data
    // keep session JSON on cookie
    // by default, the cookie is deleted when the browser is closed
    document.cookie = self.cookieName + JSON.stringify(self.session)
    // localStore
    localStorage.setItem(storageKey, JSON.stringify(data.customer))
    // emit
    emitter.emit('login', data)
  }
}
