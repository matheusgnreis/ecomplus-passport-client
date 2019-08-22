export default (self) => {
  self.makeId()
  const url = `${self.reqId}/oauth-providers.json`
  return self.ecomClient

    .passport({
      url: url
    })
    .then(resp => resp.data)
}
