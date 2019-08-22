import emitter from './../lib/emitter'

export default (self, email, docNumber = null) => {
  const url = `/identify.json`
  if (email && docNumber) {
    self.authLevel = 2
  } else if (email && !docNumber) {
    self.authLevel = 1
  } else {
    self.authLevel = 0
  }
  return self.ecomClient

    .passport({
      url: url,
      method: 'POST',
      data: {
        email: email,
        doc_number: docNumber
      }
    })

    .then(({ data }) => {
      self.setSession(data)
      emitter.emit('login', data)
      return data
    })
}
