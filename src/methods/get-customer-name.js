import {
  nickname as getNickname
} from '@ecomplus/utils'

/**
 * @method
 * @name EcomPassport#getCustomerName
 * @description Get nickname or given name from current customer account data.
 *
 * @returns {string}
 *
 * @example

ecomPassport.getCustomerName()

 */

export default self => getNickname(self.getCustomer())
