import { _config } from '@ecomplus/utils'
import ecomClient from '@ecomplus/client'

import emitter from './lib/emitter'

import init from './methods/init'
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

const _store = _config.get('store_id')
const _key = 'ecomCustomer'
const _storage = typeof window === 'object' && window.localStorage
const _document = typeof window === 'object' && window.document

export default function (storeId = _store, document = _document, lang = 'pt_br', storageKey = _key, localStorage = _storage) {
  this.ecomClient = ecomClient
  this.storeId = storeId
  this.lang = lang
  this.reqId = null
  this.session = {}
  this.authLevel = 0
  this.baseUri = 'https://passport.e-com.plus/v1/'
  this.cookieName = '_passport_session='
  // this
  const self = this

  // init
  init(self, document)

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
  this.listOrders = () => listOrders(self)

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
}
