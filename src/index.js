/**
 * https://github.com/ecomclub/ecomplus-passport-client
 * @author E-Com Club <ti@e-com.club>
 * @license MIT
 */

import { _config } from '@ecomplus/utils'
import emitter from './lib/emitter'

import initSession from './methods/init-session'
import setSession from './methods/set-session'
import getCustomerName from './methods/get-customer-name'
import getCustomer from './methods/get-customer-object'
import fetchOauthProfile from './methods/fetch-oauth-profile'
import fetchOAuthProviders from './methods/fetch-oauth-providers'
import fetchLogin from './methods/fetch-login'
import fetchOrdersList from './methods/fetch-orders-list'
import fetchOrder from './methods/fetch-order'
import isLogged from './methods/is-logged'
import isAuthorized from './methods/is-authorized'
import isVerified from './methods/is-verified'
import logout from './methods/logout'
import popupOauthLink from './methods/popup-oauth-link'
import popupLogin from './methods/popup-login'
import requestRestApi from './methods/request-rest-api'

const _store = _config.get('store_id')
const _lang = _config.get('lang')
const _document = typeof window === 'object' && window.document
const _cookie = '_ecom_passport'

export default function (storeId = _store, lang = _lang, document = _document, cookieName = _cookie) {
  this.storeId = storeId
  this.lang = lang
  this.sessionId = ''
  this.session = {}
  this.cookieName = cookieName
  this.document = document

  // this
  const self = this

  // setters
  this.initSession = () => initSession(self)
  this.setSession = data => setSession(self, data)
  this.logout = () => logout(self, document)

  // getters
  this.getCustomerName = () => getCustomerName(self)
  this.getCustomer = () => getCustomer(self)
  this.isLogged = () => isLogged(self)
  this.isAuthorized = () => isAuthorized(self)
  this.isVerified = () => isVerified(self)

  // rest api requests
  this.fetchLogin = (email, docNumber) => fetchLogin(self, email, docNumber)
  this.fetchOauthProfile = () => fetchOauthProfile(self)
  this.fetchOAuthProviders = () => fetchOAuthProviders(self)
  this.fetchOrdersList = (from, size) => fetchOrdersList(self, from, size)
  this.fetchOrder = orderId => fetchOrder(self, orderId)
  this.requestRestApi = (url, method, data) => requestRestApi(self, url, method, data)

  // async open browser popup
  this.popupOauthLink = url => popupOauthLink(self, url)
  this.popupLogin = (enableSkip, baseUri) => popupLogin(self, enableSkip, baseUri)

  // events emitter
  ;['on', 'off', 'once'].forEach(method => {
    self[method] = (ev, fn) => {
      emitter[method](ev, fn)
    }
  })

  // init
  initSession(self)
}
