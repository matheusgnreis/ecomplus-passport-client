import setCookie from './../lib/set-cookie'

export default (self, customer) => {
  if (typeof customer === 'object' && customer !== null && !Array.isArray(customer)) {
    const { document, cookieName, session } = self
    if (!session.customer) {
      session.customer = {}
    }

    // merge customer data
    // limit customer fields to prevent excedent cookie size
    ;[
      '_id',
      'oauth_providers',
      'locale',
      'main_email',
      'accepts_marketing',
      'display_name',
      'birth_date',
      'registry_type',
      'gender',
      'favorites',
      'currency_id',
      'currency_symbol'
    ].forEach(field => {
      if (customer[field] !== undefined) {
        session.customer[field] = customer[field]
      }
    })
    if (customer.orders) {
      // reduce order objects to ID and number only
      session.customer.orders = customer.orders.map(({ _id, number }) => ({ _id, number }))
    }

    // update session cookie
    setCookie(document, cookieName, JSON.stringify(session), 6)
  } else {
    throw new Error('Customer must be an object')
  }

  return self
}