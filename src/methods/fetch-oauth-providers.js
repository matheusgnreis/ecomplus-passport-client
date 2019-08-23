import { passport } from '@ecomplus/client'

export default self => passport({
  url: `${self.sessionId}/oauth-providers.json`,
  storeId: self.storeId
})
  .then(({ data }) => data)
