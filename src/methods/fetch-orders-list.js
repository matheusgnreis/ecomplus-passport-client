import { store } from '@ecomplus/client'

/**
 * @method
 * @name EcomPassport#fetchOrdersList
 * @description Fetch each order from customer's orders list.
 *
 * @returns {Promise<orders|error>}
 *
 * @example

ecomPassport.fetchOrdersList().then(orders => {
  orders.forEach(order => {
    console.log(order.number)
  })
})

 */

export default ({ storeId, getCustomer }, emitter, [from = 0, size = 10]) => {
  const requestPromises = []
  const resultOrders = []
  const sortOrdersFn = (a, b) => a.number > b.number ? -1 : 1

  ;(getCustomer().orders || [])
    .sort(sortOrdersFn).slice(from, from + size)
    .forEach(({ _id }) => {
      requestPromises.push(store({
        url: `/orders/${_id}.json`,
        storeId
      })
        .then(({ data }) => resultOrders.push(data)))
    })

  return Promise.all(requestPromises).then(() => resultOrders.sort(sortOrdersFn))
}
