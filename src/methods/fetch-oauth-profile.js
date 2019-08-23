import { passport } from '@ecomplus/client'

export default self => passport({
  url: `${self.sessionId}/token.json`,
  storeId: self.storeId
})
  .then(({ data }) => {
    self.setSession(data)
    return data
  })
