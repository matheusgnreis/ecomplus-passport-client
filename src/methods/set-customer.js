/**
 * @method
 * @name EcomPassport#setCustomer
 * @description Set (assign) customer account object and save to local storage.
 *
 * @returns {self}
 *
 * @example

ecomPassport.setCustomer(customer)

 */

export default (self, emitter, [customer, canSave = true]) => {
  if (typeof customer === 'object' && customer !== null && !Array.isArray(customer)) {
    const { storageKey, localStorage } = self

    Object.assign(self.customer, customer)
    if (canSave && storageKey && localStorage) {
      localStorage.setItem(storageKey, JSON.stringify(customer))
    }
  } else {
    throw new Error('Customer must be an object')
  }

  return self
}
