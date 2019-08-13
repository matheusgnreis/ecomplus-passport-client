(function () {
  'use strict'

  var isNodeJs = false
  // Verify if the script is Node JS
  if (typeof module !== 'undefined' && module.exports) {
    isNodeJs = true
  }

  var EcomPassport = (function () {
    'use strict'

    var storeId, lang, reqId
    var baseUri = 'https://passport.e-com.plus/v1/'
    // customer session
    // public profile and authentication
    var session = {}
    var cookieName = '_passport_session='

    var makeId = function () {
      // generate random 32 bytes string
      reqId = ''
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < 32; i++) {
        reqId += possible.charAt(Math.floor(Math.random() * possible.length))
      }
    }

    var ajaxError = function (url, res, callback) {
      // log error
      var msg = 'Request to ' + url + ' failed:\n' +
        res.status + '\n' +
        res.responseText
      var err = new Error(msg)
      console.error(err)
      // proceed to callback
      callback(err, res)
    }

    var ajaxRequest = function (method, endpoint, body, authenticate, callback) {
      var url = baseUri + storeId + '/' + endpoint
      // call with AJAX
      var ajax

      if (window.XDomainRequest) {
        // IE 8,9
        ajax = new window.XDomainRequest()

        ajax.ontimeout = ajax.onerror = function () {
          ajaxError(url, this, callback)
        }
        ajax.onload = function () {
          // treat response
          callback(null, this)
        }
      } else {
        // supported by recent browsers
        ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
          if (this.readyState === 4) {
            // done
            if (this.status >= 200 && this.status < 300) {
              // treat response
              callback(null, this)
            } else {
              ajaxError(url, this, callback)
            }
          }
        }
      }

      ajax.open(method, url, true)
      if (authenticate && typeof session.auth === 'object' && session.auth !== null) {
        // add authentication headers
        ajax.setRequestHeader('X-My-ID', session.auth.token.my_id)
        ajax.setRequestHeader('X-Access-Token', session.auth.token.access_token)
      }
      if (body) {
        // send JSON body
        ajax.setRequestHeader('Content-Type', 'application/json')
        ajax.send(JSON.stringify(body))
      } else {
        ajax.send()
      }
    }

    var sessionResponse = function (res) {
      // set new session
      try {
        var body = JSON.parse(res.responseText)
      } catch (err) {
        // invalid JSON
        console.error(err)
      }
      if (typeof body === 'object' && body !== null) {
        // set global
        session = body
        // keep session JSON on cookie
        // by default, the cookie is deleted when the browser is closed
        document.cookie = cookieName + JSON.stringify(session)
      }
    }

    var getSession = function (loginCallback) {
      var callback = function (err, res) {
        if (!err) {
          // successful request
          sessionResponse(res)
        }
        if (typeof loginCallback === 'function') {
          loginCallback(session.customer)
        }
      }
      // get customer info and authentication session
      ajaxRequest('GET', reqId + '/token.json', null, false, callback)
    }

    return {
      'init': function (StoreId, Lang) {
        // set store ID and language
        storeId = StoreId
        lang = Lang

        // try to get session from cookie
        var decodedCookie = decodeURIComponent(document.cookie)
        var ca = decodedCookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(cookieName) === 0) {
            // found cookie
            var sessionJson = c.substring(cookieName.length, c.length)
            try {
              session = JSON.parse(sessionJson)
              if (typeof session === 'object' && session !== null && !Array.isArray(session)) {
                // ok
                return
              }
            } catch (e) {
              // invalid cookie value
            }

            // reset
            session = {}
            return
          }
        }
      },

      // return current customer session
      'session': function () {
        return session
      },

      'loginPopup': function (loginCallback, enableSkip) {
        // show login frame with popup window
        // start E-Com Plus Passport flow
        // new request ID
        makeId()
        var uri = baseUri + lang + '/' + storeId + '/' + reqId + '/login.html'
        if (enableSkip) {
          // shows link to skip social login
          uri += '?enable_skip=true'
        }

        /* global screen */
        var width
        if (typeof screen === 'object' && screen !== null) {
          // set window width based on screen width
          if (screen.width >= 640) {
            width = 640
          } else {
            width = screen.width
          }
        } else {
          width = 380
        }

        // open new browser window
        var popup = window.open(uri, 'Passport', 'height=500,width=' + width)
        if (popup) {
          if (window.focus) {
            popup.focus()
          }

          var getCustomerInfo = function (fromCallback) {
            // run after login
            clearInterval(popupWatch)
            // console.log('logged?')
            // store customer public info and authentication session
            getSession(loginCallback)
          }

          // public callback function
          window.passportCallback = function () {
            // logged
            getCustomerInfo(true)
          }
          // fallback
          var popupWatch = setInterval(function () {
            if (popup.closed) {
              // may be logged
              getCustomerInfo(false)
            }
          }, 400)
        }
      },

      'loginRest': function (loginCallback, enableSkip) {
        // start E-Com Plus Passport flow
        // new request ID
        makeId()
        var uri = baseUri + lang + '/' + storeId + '/' + reqId + '/rest'
        return ajaxRequest('GET', uri, null, null, loginCallback)
      },

      'logout': function () {
        // just clears current session and cookie
        session = {}
        document.cookie = cookieName + '"null"'
      },

      // pass getSession function
      // ajax request to get customer info and save authentication session
      'getSession': getSession,

      // REST API requests
      // https://github.com/ecomclub/ecomplus-passport/blob/master/routes/api.js
      'api': function (endpoint, method, body, apiCallback) {
        // fallback for endpoint param
        if (endpoint.charAt(0) !== '/') {
          endpoint = '/' + endpoint
        }

        var callback = function (err, res) {
          // pass to callback or debug only
          if (typeof apiCallback === 'function') {
            // pass response body
            var body
            if (res.status === 204) {
              body = null
            } else {
              try {
                body = JSON.parse(res.responseText)
              } catch (e) {
                // not a valid JSON
                if (!err) {
                  err = e
                }
                // bypass response object
                body = res
              }
            }
            apiCallback(err, body)
          } else if (!err) {
            console.log(res)
          } else {
            console.error(err)
          }
        }

        // run the request
        // bypass received params
        ajaxRequest(method, 'api' + endpoint, body, true, callback)
      },

      /* utility methods */

      'isLogged': function () {
        // returns boolean
        // it does not validate authentication, only checks session existence
        if (session.auth && session.auth.token) {
          return true
        } else {
          return false
        }
      },

      'customerObject': function () {
        // returns object
        if (session.customer) {
          return session.customer
        } else {
          return {}
        }
      },

      'customerName': function () {
        // returns string
        if (session.customer) {
          return session.customer.display_name
        } else {
          return ''
        }
      }
    }
  }())

  if (isNodeJs) {
    module.exports = EcomPassport
  } else {
    // declare globally
    window.EcomPassport = EcomPassport
  }
}())
