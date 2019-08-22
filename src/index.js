import { _config } from '@ecomplus/utils'

import emitter from './lib/emitter'
import init from './lib/init'

import makeId from './methods/make-id'
import setSession from './methods/set-session'
import getCustomerName from './methods/customer-name'
import getCustomer from './methods/customer-object'
import getSession from './methods/session'
import getOAuthSession from './methods/get-session'
import getOAuthProviders from './methods/oauth-providers'
import editCustomers from './methods/edit-customer'
import editOrders from './methods/edit-order'
import listOrders from './methods/list-orders'
import viewOrder from './methods/view-order'
import isLogged from './methods/is-logged'
import logout from './methods/logout'
import loginPopup from './methods/login-popup'
import identify from './methods/login-rest'

export default function (
  storeId = _config.get('store_id'),
  document = typeof window === 'object' && window.document,
  lang = _config.get('lang'),
  storageKey = 'ecomPassport',
  localStorage = typeof window === 'object' && window.localStorage,
  cookieName = '_ecom_passport'
) {
  this.document = document
  this.storeId = storeId
  this.lang = lang
  this.reqId = null
  this.session = {}
  this.authLevel = 0
  this.baseUri = 'https://passport.e-com.plus/v1/'
  this.cookieName = cookieName

  // this
  const self = this

  // setters
  this.makeId = () => makeId(self)
  this.setSession = data => setSession(self, localStorage, storageKey, data)

  // getters
  this.getAuthLevel = () => self.authLevel
  this.getCustomerName = () => getCustomerName(self)
  this.getCustomer = () => getCustomer(self)
  this.getSession = () => getSession(self)
  this.getOAuthSession = (callback) => getOAuthSession(self, callback)
  this.getOAuthProviders = () => getOAuthProviders(self)

  // methods
  this.isLogged = () => isLogged(self)
  this.logout = () => logout(self, document)
  this.loginPopup = enableSkip => loginPopup(self, enableSkip)
  this.identify = (email, docNumber) => identify(self, email, docNumber)
  this.editCustomers = (body) => editCustomers(self, body)
  this.editOrders = (body) => editOrders(self, body)
  this.viewOrder = (orderId) => viewOrder(self, orderId)
  this.listOrders = (from, size) => listOrders(self, from, size)

  // emitter
  ;[
    'on',
    'off',
    'once'
  ].forEach(method => {
    self[method] = (ev, fn) => {
      emitter[method](ev, fn)
    }
  })

  // init
  init(self)
}