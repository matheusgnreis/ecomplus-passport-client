import setCookie from './../lib/set-cookie'

export default (self, customer) => {
  if (typeof customer === 'object' && customer !== null && !Array.isArray(customer)) {
    const { document, cookieName, session } = self
    if (!session.customer) {
      session.customer = customer
    } else {
      // merge customer data
      Object.assign(session.customer, customer)
    }
    setCookie(document, cookieName, JSON.stringify(session), 6)
  } else {
    throw new Error('Customer must be an object')
  }
  return self
}
