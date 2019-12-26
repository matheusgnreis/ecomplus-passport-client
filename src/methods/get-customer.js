/**
 * @method
 * @name EcomPassport#getCustomer
 * @description Get current customer account object.
 *
 * @returns {object}
 *
 * @example

const customer = ecomPassport.getCustomer()
console.log(customer.main_email)

 */

export default ({ customer }) => customer || {}
