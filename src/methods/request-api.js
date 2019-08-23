import { passport } from '@ecomplus/client'

export default (self, url, method, data) => {
  const { storeId, session, isLogged, isAuthorized, isVerified } = self

  // check authorization level first
  if (!isLogged()) {
    return Promise.reject(new Error('Unauthorized, requires login'))
  }
  switch (method.toLowerCase()) {
    case 'get':
    case 'post':
      if (!isAuthorized()) {
        return Promise.reject(new Error('Unauthorized, requires login with doc number'))
      }
      break
    default:
      if (!isVerified()) {
        return Promise.reject(new Error('Unauthorized, requires oauth login'))
      }
  }

  // send authenticated request to E-Com Plus Passport REST API
  return passport({
    url,
    storeId,
    customerId: session.auth.id,
    accessToken: session.auth.token,
    method,
    data
  })
}
