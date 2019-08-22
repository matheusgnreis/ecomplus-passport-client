import { nickname } from '@ecomplus/utils'

export default (self) => {
  // returns object
  return nickname(self.session.customer)
}
