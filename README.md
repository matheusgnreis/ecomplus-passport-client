# ecomplus-passport-client

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/ecomplus-passport-client/badge)](https://www.codefactor.io/repository/github/ecomclub/ecomplus-passport-client)
[![npm version](https://img.shields.io/npm/v/@ecomplus/client.svg)](https://www.npmjs.org/@ecomplus/passport-client)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Handle customer authentication with E-Com Plus Passport

[Changelog](https://github.com/ecomclub/ecomplus-passport-client/blob/master/CHANGELOG.md)

## Usage

The `@ecomplus/passport-client` package can be used to handle login and
persist/manipulate customer account data trough E-Com Plus Passport and Store APIs.

It's available for both Node.js and browser environments.

- [Get started](http://developers.e-com.plus/ecomplus-passport-client/module-@ecomplus_passport-client.html)
- [Class reference](http://developers.e-com.plus/ecomplus-passport-client/EcomPassport.html)

### Example

```js
import ecomPassport from '@ecomplus/passport-client'

ecomPassport.fetchLogin(localStorage.getItem('email'), localStorage.getItem('doc_number'))

ecomPassport.on('logout', () => {
  console.log('User logged OUT')
})

ecomPassport.on('login', (user) => {
  console.log('User logged IN', user)
  ecomPassport.fetchOrdersList()
    .then(orders => {
      console.log('Listing customer orders', orders)
    })
})
```

### Dependencies

It requires and _may not_ include:

- `core-js`;
- [`eventemitter3`](https://github.com/primus/eventemitter3);
- [`@ecomplus/utils`](https://github.com/ecomclub/ecomplus-utils);
- [`@ecomplus/client`](https://github.com/ecomclub/ecomplus-client);

#### Node.js

```bash
npm i --save @ecomplus/utils @ecomplus/passport-client
```

#### Webpack

```bash
npm i --save core-js @ecomplus/utils @ecomplus/passport-client
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/passport-client/dist/ecom-passport.var.min.js"></script>
```

`EventEmitter3`, `ecomUtils` and `ecomClient` libraries **must be included separately**
and available on window scope.
