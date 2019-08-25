# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.6.0](https://github.com/ecomclub/ecomplus-passport-client/compare/v0.5.0...v0.6.0) (2019-08-25)


### Bug Fixes

* **fetch-oauth-providers:** fix method name (camel case) ([b0c53b8](https://github.com/ecomclub/ecomplus-passport-client/commit/b0c53b8))


### BREAKING CHANGES

* **fetch-oauth-providers:** ftechOAuthProviders no more working (fixed name)



## [0.5.0](https://github.com/ecomclub/ecomplus-passport-client/compare/v0.4.0...v0.5.0) (2019-08-24)


### Bug Fixes

* **constructor:** events are global, set it on constructor ([486be86](https://github.com/ecomclub/ecomplus-passport-client/commit/486be86))
* **constructor:** get store id from config dynamically ([9ab041b](https://github.com/ecomclub/ecomplus-passport-client/commit/9ab041b))
* **get-customer-name:** call getCustomer method correctly ([07a5dbb](https://github.com/ecomclub/ecomplus-passport-client/commit/07a5dbb))


### Features

* **emitter:** emit events with self (instance) as argument ([3443952](https://github.com/ecomclub/ecomplus-passport-client/commit/3443952))


### Tests

* **events:** update handling events (from constructor) ([b719bc0](https://github.com/ecomclub/ecomplus-passport-client/commit/b719bc0))


### BREAKING CHANGES

* **constructor:** instance have no more on, off, once fn



## [0.4.0](https://github.com/ecomclub/ecomplus-passport-client/compare/v0.3.0...v0.4.0) (2019-08-23)


### Bug Fixes

* **fetch:** must use self.storeId to request store and passport api ([298441e](https://github.com/ecomclub/ecomplus-passport-client/commit/298441e))


### chore

* **rest-api:** renaming method to 'restApi' only ([af320af](https://github.com/ecomclub/ecomplus-passport-client/commit/af320af))


### BREAKING CHANGES

* **rest-api:** old 'requestRestApi' no more working



## [0.3.0](https://github.com/ecomclub/ecomplus-passport-client/compare/v0.2.0...v0.3.0) (2019-08-23)


### Bug Fixes

* **fetch-oauth:** fixing fetch methods names and handlers ([fb1eade](https://github.com/ecomclub/ecomplus-passport-client/commit/fb1eade))
* **fetch-orders:** fix names and handle fetch order and orders list ([aeeeb72](https://github.com/ecomclub/ecomplus-passport-client/commit/aeeeb72))
* **get-customer:** fixing get methods names and handlers ([651fd3c](https://github.com/ecomclub/ecomplus-passport-client/commit/651fd3c))
* **logout:** ensure cookie unset ([777926a](https://github.com/ecomclub/ecomplus-passport-client/commit/777926a))
* **logout:** fix unseting cookie ([5d87191](https://github.com/ecomclub/ecomplus-passport-client/commit/5d87191))
* **logout:** return self instance (as a setter) ([8dd4baf](https://github.com/ecomclub/ecomplus-passport-client/commit/8dd4baf))
* **post-login:** fix method to login with email/doc ([ae85bde](https://github.com/ecomclub/ecomplus-passport-client/commit/ae85bde))
* **set-session:** check auth level with isAuthorized ([9ae8521](https://github.com/ecomclub/ecomplus-passport-client/commit/9ae8521))
* **set-session:** save to cookie with expiration time, emit with level ([6ba50dc](https://github.com/ecomclub/ecomplus-passport-client/commit/6ba50dc))
* **state-getters:** handling is authorized and is logged (bools) ([f2311cb](https://github.com/ecomclub/ecomplus-passport-client/commit/f2311cb))


### Features

* **init-session:** try to get stored session, create session id ([b59d84c](https://github.com/ecomclub/ecomplus-passport-client/commit/b59d84c))
* **is-verified:** method to check last authorization level ([a588273](https://github.com/ecomclub/ecomplus-passport-client/commit/a588273))
* **popups:** popup for oauth direct link and login menu ([1c97122](https://github.com/ecomclub/ecomplus-passport-client/commit/1c97122))
* **request-rest-api:** send authenticated request to passport rest api ([ceb0368](https://github.com/ecomclub/ecomplus-passport-client/commit/ceb0368))


### refactor

* **consturctor:** renaming methods, removing unecessary members ([f47705a](https://github.com/ecomclub/ecomplus-passport-client/commit/f47705a))


### Tests

* **fix:** update with new methods ([ccb16f0](https://github.com/ecomclub/ecomplus-passport-client/commit/ccb16f0))


### BREAKING CHANGES

* **consturctor:** methods renamed, old methods will no more work



## 0.2.0 (2019-08-22)


### Bug Fixes

* **list-orders:** fix method to output errors, add pagination ([5bef449](https://github.com/ecomclub/ecomplus-passport-client/commit/5bef449))
* ([#4](https://github.com/ecomclub/ecomplus-passport-client/issues/4)) ([903f47e](https://github.com/ecomclub/ecomplus-passport-client/commit/903f47e))
* customerName method returning display_name property ([1414529](https://github.com/ecomclub/ecomplus-passport-client/commit/1414529))
* edit popup size, height 500, width based on screen width ([9aef895](https://github.com/ecomclub/ecomplus-passport-client/commit/9aef895))


### Build System

* **webpack:** fix lib name and externals config ([a242277](https://github.com/ecomclub/ecomplus-passport-client/commit/a242277))


### Features

* **init:** try to get cookie from session ([dafbeab](https://github.com/ecomclub/ecomplus-passport-client/commit/dafbeab))
* **login:** by email and doc_number ([197a9ea](https://github.com/ecomclub/ecomplus-passport-client/commit/197a9ea))
* **login:** popup with providers list ([5bb241e](https://github.com/ecomclub/ecomplus-passport-client/commit/5bb241e))
* **method:** checks if user is logged ([240fd7d](https://github.com/ecomclub/ecomplus-passport-client/commit/240fd7d))
* **method:** return data from single order ([728d94e](https://github.com/ecomclub/ecomplus-passport-client/commit/728d94e))
* **method:** return list of orders from logged customer ([85f3db2](https://github.com/ecomclub/ecomplus-passport-client/commit/85f3db2))
* **method:** return list of providers ([187cbff](https://github.com/ecomclub/ecomplus-passport-client/commit/187cbff))
* **method:** return user session ([08b40aa](https://github.com/ecomclub/ecomplus-passport-client/commit/08b40aa))
* **method:** set customer session ([2be6bf9](https://github.com/ecomclub/ecomplus-passport-client/commit/2be6bf9))
* **method:** user logout ([48c61f2](https://github.com/ecomclub/ecomplus-passport-client/commit/48c61f2))
* **methods:** edit customer ([73d9fd8](https://github.com/ecomclub/ecomplus-passport-client/commit/73d9fd8))
* **methods:** edit order ([fe09e14](https://github.com/ecomclub/ecomplus-passport-client/commit/fe09e14))
* **methods:** return customer name ([d83ec25](https://github.com/ecomclub/ecomplus-passport-client/commit/d83ec25))
* **methods:** return customer object ([7645bd0](https://github.com/ecomclub/ecomplus-passport-client/commit/7645bd0))
* **methods:** return session object ([7fbc42e](https://github.com/ecomclub/ecomplus-passport-client/commit/7fbc42e))
* login via rest ([e17ab8e](https://github.com/ecomclub/ecomplus-passport-client/commit/e17ab8e))


### Tests

* **constructor:** update constructor name ([45611af](https://github.com/ecomclub/ecomplus-passport-client/commit/45611af))
* lib ([19799a6](https://github.com/ecomclub/ecomplus-passport-client/commit/19799a6))
* lib ([1d6628d](https://github.com/ecomclub/ecomplus-passport-client/commit/1d6628d))
