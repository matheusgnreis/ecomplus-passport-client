import setCookie from './../lib/set-cookie'

/**
 * @method
 * @name EcomPassport#setSession
 * @description Set session object and save to cookie.
 *
 * @param {object} session - Passport session object
 * @param {boolean} [canSave=true] - Save to cookie
 *
 * @returns {self}
 *
 * @example

ecomPassport.setSession(session)

 */

export default (self, emitter, [session, canSave = true]) => {
  const { document, storageKey, setCustomer, checkLogin } = self

  if (typeof session !== 'object' || session === null || Array.isArray(session)) {
    session = {}
  } else if (session.customer) {
    self.customer = {}
    setCustomer(session.customer, canSave)
    delete session.customer
  }

  self.session = session
  if (canSave) {
    setCookie(document, storageKey, JSON.stringify(session), 6)
  }

  if (checkLogin()) {
    emitter.emit('login', self)
  }
  return self
}
