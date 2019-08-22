export default (self) => {
  // generate random 32 bytes string
  self.reqId = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 32; i++) {
    self.reqId += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return self.reqId
}