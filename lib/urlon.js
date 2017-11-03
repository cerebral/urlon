/* eslint-disable no-labels */
'use strict'

var URLON = {
  stringify: function (input) {
    function encodeString (str) {
      return encodeURI(str.replace(/([=:&@_;/])/g, '/$1'))
    }

    function stringify (input) {
      // Number or Boolean or Null
      if (typeof input === 'number' || input === true || input === false || input === null) {
        return ':' + input
      }
      var res = []
      // Array
      if (input instanceof Array) {
        for (var i = 0; i < input.length; ++i) {
          res.push(stringify(input[i]))
        }
        return '@' + res.join('&') + ';'
      }
      // Object
      if (typeof input === 'object') {
        for (var key in input) {
          res.push(encodeString(key) + stringify(input[key]))
        }
        return '_' + res.join('&') + ';'
      }
      // String or undefined
      return '=' + encodeString((input !== null ? (input !== undefined ? input : 'undefined') : 'null').toString())
    }

    return stringify(input).replace(/;+$/g, '')
  },

  parse: function (str) {
    var pos = 0
    str = decodeURI(str)

    function read () {
      var token = ''
      for (; pos !== str.length; ++pos) {
        if (str.charAt(pos) === '/') {
          pos += 1
          if (pos === str.length) {
            token += ';'
            break
          }
        } else if (str.charAt(pos).match(/[=:&@_;]/)) {
          break
        }
        token += str.charAt(pos)
      }
      return token
    }

    function parse () {
      var type = str.charAt(pos++)

      // String
      if (type === '=') {
        return read()
      }
      // Number or Boolean
      if (type === ':') {
        var value = read()
        if (value === 'true') {
          return true
        }
        if (value === 'false') {
          return false
        }
        value = parseFloat(value)
        return isNaN(value) ? null : value
      }
      var res
      // Array
      if (type === '@') {
        res = []
        loop: {
          if (pos >= str.length || str.charAt(pos) === ';') {
            break loop
          }
          while (1) {
            res.push(parse())
            if (pos >= str.length || str.charAt(pos) === ';') {
              break loop
            }
            pos += 1
          }
        }
        pos += 1
        return res
      }
      // Object
      if (type === '_') {
        res = {}
        loop: {
          if (pos >= str.length || str.charAt(pos) === ';') {
            break loop
          }
          while (1) {
            var name = read()
            res[name] = parse()
            if (pos >= str.length || str.charAt(pos) === ';') {
              break loop
            }
            pos += 1
          }
        }
        pos += 1
        return res
      }
      // Error
      throw new Error('Unexpected char ' + type)
    }

    return parse()
  }
}

module.exports = URLON
