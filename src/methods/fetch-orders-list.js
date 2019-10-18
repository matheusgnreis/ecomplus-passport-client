export default (self, from = 0, size = 10) => {
  const { orders } = self.getCustomer()
  const results = []
  const promises = []
  for (let i = 0; i < orders.length && i < (from + size); i++) {
    const promise = self.requestApi(`/orders/${orders[i]._id}.json`).then(({ data }) => results.push(data))
    promises.push(promise)
  }
  return Promise.all(promises).then(() => results)
}
