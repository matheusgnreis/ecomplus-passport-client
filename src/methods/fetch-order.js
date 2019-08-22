import { passport, store } from '@ecomplus/client'

export default (self, orderId) => {
  const url = `/orders/${orderId}.json`
  let req
  if (self.isAuthorized()) {
    // with authentication
    const { auth } = self.session
    req = passport({
      url,
      customerId: auth.id,
      accessToken: auth.token
    })
  } else {
    // only public order info
    req = store({ url })
  }
  return req.then(({ data }) => data)
}
