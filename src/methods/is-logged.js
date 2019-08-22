// does not validate authentication
// only checks session existence and customer info
export default self => Boolean(self.getCustomerName())
