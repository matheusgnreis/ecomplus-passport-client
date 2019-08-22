export default (self, enableSkip, baseUri = 'https://passport.e-com.plus/v1/') => {
  let url = `${baseUri}${self.lang}/${self.storeId}/${self.sessionId}/login.html`
  if (enableSkip) {
    // shows link to skip social login
    url += '?enable_skip=true'
  }
  return self.popupOauthLink(url)
}
