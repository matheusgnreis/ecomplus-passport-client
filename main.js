window.EcomPassport = (function () {
  'use strict'

  var storeId, lang, reqId
  var baseUri = 'https://passport.e-com.plus/v1/'
  // customer session
  // public profile and authentication
  var session = {}

  var makeId = function () {
    // generate random 32 bytes string
    reqId = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 32; i++) {
      reqId += possible.charAt(Math.floor(Math.random() * possible.length))
    }
  }

  var ajaxRequest = function (method, endpoint, body, authenticate, successCallback) {
    // call with AJAX
    var ajax
    if (window.XDomainRequest) {
      // IE 8,9
      ajax = new window.XDomainRequest()
      ajax.onload = function () {
        // treat response
        successCallback(this)
      }
    } else {
      // supported by recent browsers
      ajax = new XMLHttpRequest()
      ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          // treat response
          successCallback(this)
        }
      }
    }

    var url = baseUri + storeId + '/' + reqId + endpoint
    ajax.open(method, url, true)
    if (authenticate && typeof session.auth === 'object' && session.auth !== null) {
      // add authentication headers
      ajax.setRequestHeader('X-My-ID', session.auth.id)
      ajax.setRequestHeader('X-Access-Token', session.auth.token)
    }
    if (body) {
      // send JSON body
      ajax.send(JSON.stringify(body))
    } else {
      ajax.send()
    }
  }

  var sessionResponse = function (res) {
    // set new session
    var body = res.responseJSON
    if (typeof body === 'object' && body !== null) {
      // set global
      session = body
    }
  }

  var getSession = function () {
    // get customer info and authentication session
    ajaxRequest('GET', '/token.json', null, false, sessionResponse)
  }

  return {
    'init': function (StoreId, Lang) {
      // set store ID and language
      storeId = StoreId
      lang = Lang
    },

    // return current customer session
    'session': function () {
      return session
    },

    'loginPopup': function () {
      // show login frame with popup window
      // start E-Com Plus Passport flow
      // new request ID
      makeId()
      var uri = baseUri + lang + '/' + storeId + '/' + reqId + '/login.html'
      var popup = window.open(uri, 'Passport', 'height=400,width=340')
      if (window.focus) {
        popup.focus()
      }

      var getCustomerInfo = function (fromCallback) {
        // run after login
        clearInterval(popupWatch)
        // console.log('logged?')
        // store customer public info and authentication session
        getSession()
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
    },

    getSession
  }
}())
