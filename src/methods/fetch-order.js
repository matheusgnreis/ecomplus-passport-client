import { passport, store } from '@ecomplus/client'

export default (self, orderId) => {
  const { storeId, session, isAuthorized } = self
  const url = `/api/orders/${orderId}.json`
  let req
  if (isAuthorized()) {
    // with authentication
    const { auth } = session
    req = passport({
      url,
      customerId: auth.id,
      accessToken: auth.token.access_token,
      storeId
    })
  } else {
    // only public order info
    req = store({ url, storeId })
  }
  return req.then(({ data }) => data)
}
