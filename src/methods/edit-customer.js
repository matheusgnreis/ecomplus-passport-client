export default (self, body) => {
  if (self.getAuthLevel <= 2) {
    throw new Error('Unauthorized, need permission')
  }

  // Authenticated request
  const customerId = self.session.auth.token.my_id
  const accessToken = self.session.auth.token.access_token

  return self.ecomClient

    .passport({
      url: `api/customers.json`,
      customerId,
      accessToken,
      method: 'POST',
      data: body
    })
}
