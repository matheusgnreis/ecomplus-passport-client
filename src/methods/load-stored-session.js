import getCookie from './../lib/get-cookie'
import setCookie from './../lib/set-cookie'

/**
 * @method
 * @name EcomPassport#loadStoredSession
 * @description Try to load session object from cookie
 * and customer data from localStorage.
 *
 * @returns {self}
 *
 * @example

ecomPassport.loadStoredSession()

 */

export default self => {
  const { document, storageKey, localStorage, setSession } = self

  if (storageKey) {
    if (document) {
      const sessionJson = getCookie(document, storageKey)
      if (sessionJson) {
        let session
        try {
          session = JSON.parse(sessionJson)
        } catch (e) {
          setCookie(document, storageKey, '', -1)
          return self
        }

        if (localStorage) {
          const customerJson = localStorage.getItem(storageKey)
          if (customerJson) {
            try {
              session.customer = JSON.parse(customerJson)
            } catch (e) {
              localStorage.removeItem(storageKey)
            }
          }
        }
        if (!session.customer) {
          session.customer = {}
        }

        setSession(session, false)
      }
    }
  }

  return self
}
