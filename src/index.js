/**
 * Handle customer authentication with E-Com Plus Passport.
 * {@link https://github.com/ecomclub/ecomplus-passport-client GitHub}
 *
 * @module @ecomplus/passport-client
 * @author E-Com Club <ti@e-com.club>
 * @return {@link ecomPassport}
 * @see ecomPassport
 *
 * @example
 * // ES import default
 * import ecomPassport from '@ecomplus/passport-client'
 *
 * @example
 * // Optional named ES import for default instance and constructor
 * import { ecomPassport, EcomPassport } from '@ecomplus/passport-client'
 *
 * @example
 * // With CommonJS
 * const ecomPassport = require('@ecomplus/passport-client')
 *
 * @example
 * <!-- Global `ecomPassport` from CDN on browser -->
 * <script src="https://cdn.jsdelivr.net/npm/@ecomplus/passport-client/dist/ecom-passport.var.min.js"></script>
 *
 * @example
 * <!-- Bundle from CDN with `ecomUtils`, `ecomClient` and `EventEmitter3` -->
 * <script src="https://cdn.jsdelivr.net/npm/@ecomplus/passport-client/dist/ecom-passport.bundle.min.js"></script>
 */

import EcomPassport from './constructor'

/**
 * Default `EcomPassport` instance.
 * @global
 * @type EcomPassport
 */

const ecomPassport = new EcomPassport()

export default ecomPassport

export { ecomPassport, EcomPassport }
