import sleep from './../lib/await-sleep'

export default (self) => {
  const customer = self.getCustomer()
  let list = []
  // public api
  list = customer.orders.map(async order => {
    await sleep(60)
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
