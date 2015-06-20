/*!
 * express-ip-filter <https://github.com/tunnckoCore/express-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var ipFilter = require('ip-filter')

module.exports = function expressIpFilter (options) {
  options = typeof options === 'object' ? options : {}

  return function (req, res, next) {
    var id = typeof options.id === 'function' ? options.id.call(this, req, res) : req.ip

    if (!id || !options.filter) {
      next()
      return
    }

    var strict = typeof options.strict === 'boolean' ? options.strict : true
    var forbidden = options.forbidden || '403 Forbidden'

    var identifier = ipFilter(id, options.filter, !strict)
    if (identifier === null) {
      var body = typeof forbidden === 'function' ? forbidden.call(this, req, res) : forbidden
      res.status(403).send(body)
      return
    }

    res.filter = ipFilter
    res.identifier = identifier

    next()
  }
}
