import { store } from '@ecomplus/client'

export default (self, orderId) => {
  const { storeId, isAuthorized, requestApi } = self
  const url = `/api/orders/${orderId}.json`
  let req
  if (isAuthorized()) {
    // with authentication
    req = requestApi(url)
  } else {
    // only public order info
    req = store({ url, storeId })
  }
  return req.then(({ data }) => data)
}
