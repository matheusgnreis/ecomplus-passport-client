export default (self) => {
  const customer = self.getCustomer()
  let list = []
  // public api
  list = customer.orders.map(async order => {
    const options = {
      url: `/orders/${order._id}.json`
    }
    let result = await self.ecomClient
      .store(options)
      .then(resp => resp.data)
      .catch(err => console.error('E-Com Plus API request failed:', err))
    return result
  })
  return Promise.all(list)
}
