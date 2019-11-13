import { passport } from '@ecomplus/client'

export default (self, url, method, data) => {
  // ensure method is lowercased
  if (method) {
    method = method.toLowerCase()
  } else {
    method = 'get'
  }
  const { storeId, session, isLogged, isAuthorized, isVerified } = self

  // check authorization level first
  if (!isLogged()) {
    return Promise.reject(new Error('Unauthorized, requires login'))
  }
  if (url.endsWith('/me.json') || (method === 'get' || method === 'post')) {
    if (!isAuthorized()) {
      return Promise.reject(new Error('Unauthorized, requires login with doc number'))
    }
  } else if (!isVerified()) {
    return Promise.reject(new Error('Unauthorized, requires oauth login'))
  }

  // fix URL with api prefix if necessary
  if (url.indexOf('api/') < 0) {
    url = '/api' + (url.charAt(0) === '/' ? url : `/${url}`)
  }

  // send authenticated request to E-Com Plus Passport REST API
  return passport({
    url,
    storeId,
    customerId: session.auth.id,
    accessToken: session.auth.token && session.auth.token.access_token,
    method,
    data
  }).then(response => {
    if (url.endsWith('/me.json') && method === 'patch') {
      // customer updated
      // also update current session customer object
      self.setCustomer(data)
    }
    return response
  })
}
