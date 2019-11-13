import { store } from '@ecomplus/client'

export default (self, from = 0, size = 10) => {
  const requestPromises = []
  const resultOrders = []

  self.getCustomer().orders
    // sort by order number desc
    .sort((a, b) => b.number - a.number)
    .slice(from, from + size)
    .forEach(({ _id }) => {
      // use ecomClient.store to fetch cache (faster) API
      requestPromises.push(store({
        url: `/orders/${_id}.json`,
        storeId: self.storeId
      })
        .then(({ data }) => resultOrders.push(data)))
    })

  return Promise.all(requestPromises).then(() => resultOrders)
}
