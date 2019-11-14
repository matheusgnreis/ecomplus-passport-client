import emitter from './../lib/emitter'
import updateSession from './../lib/update-session'

export default (self, session) => {
  if (typeof session !== 'object' || session === null || Array.isArray(session)) {
    // session must be an object
    session = {}
  }
  self.session = session
  // update session cookie and emit event
  updateSession(self)

  if (self.isLogged()) {
    // emit login event
    emitter.emit('login', self)
  }

  return self
}
