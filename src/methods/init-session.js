import emitter from './../lib/emitter'
import getCookie from './../lib/get-cookie'

export default self => {
  const { document, cookieName, setSession } = self
  let session
  // try to get session from cookie
  const sessionJson = getCookie(document, cookieName)
  if (sessionJson) {
    try {
      session = JSON.parse(sessionJson)
    } catch (e) {
      // invalid cookie value
    }
  }
  setSession(session)

  // listen to internal update session event by cookie name
  emitter.on(`updateSession[${cookieName}]`, session => {
    setSession(session)
  })

  // generate random 32 bytes string
  self.sessionId = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    self.sessionId += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return self
}
