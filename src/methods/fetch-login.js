import { passport } from '@ecomplus/client'

/**
 * @method
 * @name EcomPassport#fetchLogin
 * @description Try to identify/login user with email and doc number.
 *
 * @returns {Promise<session|error>}
 *
 * @example

ecomPassport.fetchLogin('example@mail.com', '1234567890')

 */

export default ({ storeId, setSession }, emitter, [email, docNumber = null]) => passport({
  url: '/identify.json',
  storeId,
  method: 'POST',
  data: {
    email,
    doc_number: docNumber
  }
}).then(({ data }) => {
  setSession(data)
  return data
})
