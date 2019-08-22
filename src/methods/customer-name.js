import { nickname } from '@ecomplus/utils'

export default (self) => {
  // returns object
  if (self.session.customer) {
    return self.session.customer.display_name
  } else {
    return ''
  }
}
