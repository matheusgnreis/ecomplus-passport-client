export default (self, orderId) => {
  const options = {
    url: `/orders/${orderId}.json`
  }
  return self.ecomClient
    .store(options)
    .then(resp => resp.data)
    .catch(err => console.error('E-Com Plus API request failed:', err))
}
