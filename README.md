# E-Com Plus Passport Client

[![Publish](https://github.com/ecomplus/passport-client/workflows/Publish/badge.svg)](https://github.com/ecomplus/passport-client/actions?workflow=Publish) [![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/passport-client/badge)](https://www.codefactor.io/repository/github/ecomplus/passport-client) [![npm version](https://img.shields.io/npm/v/@ecomplus/passport-client.svg)](https://www.npmjs.org/@ecomplus/passport-client) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Handle customer authentication with E-Com Plus Passport

[CHANGELOG](https://github.com/ecomplus/passport-client/blob/master/CHANGELOG.md)

## Usage

The `@ecomplus/passport-client` package can be used to handle login and persist/manipulate customer account data trough E-Com Plus Passport and Store APIs.

It's available for both Node.js and browser environments.

- [Get started](http://developers.e-com.plus/passport-client/module-@ecomplus_passport-client.html)
- [Class reference](http://developers.e-com.plus/passport-client/EcomPassport.html)

### Example

```js
import ecomPassport from '@ecomplus/passport-client'

ecomPassport.fetchLogin(localStorage.getItem('email'), localStorage.getItem('doc_number'))

ecomPassport.on('logout', () => {
  console.log('User logged OUT')
})

ecomPassport.on('login', () => {
  console.log('User logged IN', ecomPassport.getCustomer())
  ecomPassport.fetchOrdersList()
    .then(orders => {
      console.log('Listing customer orders', orders)
    })
})
```

### Installation

It _may_ require and doesn't include `core-js` (optional) and [`@ecomplus/utils`](https://developers.e-com.plus/utils/) (peer dependency).

#### Webpack

```bash
npm i --save core-js @ecomplus/utils @ecomplus/passport-client
```

#### Node.js

```bash
npm i --save @ecomplus/utils @ecomplus/passport-client
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/passport-client/dist/ecom-passport.var.min.js"></script>
```

When importing from CDN, `EventEmitter3`, `ecomUtils` and `ecomClient` libraries **must be included separately** and available on window scope.
