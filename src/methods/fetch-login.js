import { passport } from '@ecomplus/client'

export default (self, email, docNumber = null) => passport({
  url: '/identify.json',
  storeId: self.storeId,
  method: 'POST',
  data: {
    email,
    doc_number: docNumber
  }
}).then(({ data }) => {
  self.setSession(data)
  return data
})
