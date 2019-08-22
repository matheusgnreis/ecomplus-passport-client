// TODO
export default (self, callback) => {
  self.ecomClient

    .passport({
      url: `${self.reqId}/token.json`
    })

    .then(({ data }) => {
      self.setSession(data)
      if (typeof callback === 'function') {
        callback(data)
      }
    })

    .catch(err => console.error('Passport API request failed', err))
}
