import { store } from '@ecomplus/client'

export default (self, from = 0, size = 10) => {
  const { orders } = self.getCustomer()
  const results = []
  const promises = []
  for (let i = 0; i < orders.length && i < (from + size); i++) {
    promises.push(store({
      url: `/orders/${orders[i]._id}.json`,
      storeId: self.storeId
    })
      .then(({ data }) => results.push(data)))
  }
  return Promise.all(promises).then(() => results)
}
