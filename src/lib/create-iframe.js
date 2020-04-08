export default url => {
  if (typeof window !== 'object') {
    throw new Error('Method available for browser only')
  }

  // create hidden iframe and append to body
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', url)
  iframe.setAttribute('title', 'E-Com Plus Passport for login and register')
  iframe.setAttribute('style', 'width:0;height:0;border:0;border:none;')
  document.body.appendChild(iframe)
}
