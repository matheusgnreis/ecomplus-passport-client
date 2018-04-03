window.EcomPassport = (function () {
  'use strict'

  var storeId, lang, reqId
  var baseUri = 'https://passport.e-com.plus/v1/'

  function makeId () {
    // generate random 32 bytes string
    reqId = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 32; i++) {
      reqId += possible.charAt(Math.floor(Math.random() * possible.length))
    }
  }

  return {
    'init': function (StoreId, Lang) {
      // set store ID and language
      storeId = StoreId
      lang = Lang
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
        console.log('logged?')
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
  }
}())
