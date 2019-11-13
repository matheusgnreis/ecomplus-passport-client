export default (self, customer) => {
  if (typeof customer === 'object' && customer !== null && !Array.isArray(customer)) {
    const { session } = self
    if (!session.customer) {
      session.customer = customer
    } else {
      // merge customer data
      Object.assign(session.customer, customer)
    }
  } else {
    throw new Error('Customer must be an object')
  }
  return self
}
