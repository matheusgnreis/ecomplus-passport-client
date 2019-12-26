import setCookie from './../lib/set-cookie'

/**
 * @method
 * @name EcomPassport#logout
 * @description Reset session and customer account object.
 *
 * @returns {self}
 *
 * @example

ecomPassport.logout()

 */

export default (self, emitter, [canSave = true]) => {
  const { document, storageKey, localStorage } = self

  self.session = {}
  self.customer = {}
  if (canSave && storageKey) {
    if (document) {
      setCookie(document, storageKey, '', -1)
    }
    if (localStorage) {
      localStorage.removeItem(storageKey)
    }
  }

  emitter.emit('logout', self)
  return self
}
