import emitter from './../lib/emitter'
import setCookie from './../lib/set-cookie'

export default self => {
  const { document, cookieName, session } = self
  // save session cookie
  setCookie(document, cookieName, JSON.stringify(session), 6)
  // emit session update internal event
  emitter.emit(`updateSession[${cookieName}]`, session)
}
