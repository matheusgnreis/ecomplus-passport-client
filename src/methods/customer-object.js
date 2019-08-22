export default (self) => {
  // returns object
  if (self.session.customer) {
    return self.session.customer
  } else {
    return {}
  }
}