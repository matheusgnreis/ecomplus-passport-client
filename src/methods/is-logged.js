export default (self) => {
  // returns boolean
  // it does not validate authentication, only checks session existence
  if (self.session.auth && self.session.auth.token) {
    return true
  } else {
    return false
  }
}
