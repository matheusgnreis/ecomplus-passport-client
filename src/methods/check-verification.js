/**
 * @method
 * @name EcomPassport#checkVerification
 * @description Check session biggest auth level (does not validate token).
 *
 * @returns {boolean}
 *
 * @example

ecomPassport.checkVerification()

 */

export default ({ session }) => Boolean(session.auth && session.auth.level >= 3)
