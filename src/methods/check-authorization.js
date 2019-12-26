/**
 * @method
 * @name EcomPassport#checkAuthorization
 * @description Check session auth level (does not validate token).
 *
 * @returns {boolean}
 *
 * @example

ecomPassport.checkAuthorization()

 */

export default ({ session }) => Boolean(session.auth && session.auth.level >= 2)
