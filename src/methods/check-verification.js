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

export default ({ session, checkAuthorization }) => {
  return Boolean(checkAuthorization() && session.auth.level >= 3)
}
