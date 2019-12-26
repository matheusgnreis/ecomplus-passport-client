import { store } from '@ecomplus/client'

/**
 * @method
 * @name EcomPassport#fetchOrder
 * @description Fetch order by ID from Passport API (if authorized) or Store API (public).
 *
 * @param {string} orderId - Object ID (`_id`) of the order to be fetched
 *
 * @returns {Promise<data|error>}
 *
 * @example

ecomPassport.fetchOrder(orderId).then(order => {
  console.log(order._id)
})

 */

export default ({ storeId, checkAuthorization, requestApi }, emitter, [orderId]) => {
  const url = `/api/orders/${orderId}.json`
  let req
  if (checkAuthorization()) {
    req = requestApi(url)
  } else {
    req = store({ url, storeId })
  }
  return req.then(({ data }) => data)
}
