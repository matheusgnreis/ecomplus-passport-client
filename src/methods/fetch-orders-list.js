import { store } from '@ecomplus/client'

export default (self, from = 0, size = 10) => {
  const requestPromises = []
  const resultOrders = []

  // sort by order number desc
  const sortOrdersFn = (a, b) => b.number - a.number

  ;(self.getCustomer().orders || [])
    // handle orders sorting and pagination first
    .sort(sortOrdersFn).slice(from, from + size)
    .forEach(({ _id }) => {
      // use ecomClient.store to fetch cache (faster) API
      requestPromises.push(store({
        url: `/orders/${_id}.json`,
        storeId: self.storeId
      })
        .then(({ data }) => resultOrders.push(data)))
    })

  // must sort orders again due to async result pushes
  return Promise.all(requestPromises).then(() => resultOrders.sort(sortOrdersFn))
}
