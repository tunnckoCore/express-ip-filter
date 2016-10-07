/*!
 * express-ip-filter <https://github.com/tunnckoCore/express-ip-filter>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var ipFilter = require('ip-filter')

/**
 * > Filtering incoming request with glob patterns
 * array, regexp, string or matcher function
 *
 * **Example**
 *
 * ```js
 * 'use strict'
 *
 * var express = require('express')
 * var ipFilter = require('express-ip-filter')
 * var helloWorld = require('express-hello-world')
 *
 * var app = express()
 *
 * app
 * .use(ipFilter({
 *   forbidden: '403: Get out of here!',
 *   filter: ['127.??.6*.12', '!1.2.*.4']
 * }))
 * .use(helloWorld())
 *
 * app.listen(1234)
 * console.log('express server start listening on http://localhost:1234')
 *
 * // if your IP is `127.43.65.12` you will see `Hello World`
 * // otherwise you will see `403: Get out of here!`
 * ```
 *
 * @name  expressIpFilter
 * @param  {Object} `options`
 *   @option {Function} [options] `id` custom identifier, defaults to `this.ip`
 *   @option {Boolean} [options] `strict` to throw when not valid IPv4/IPv6? default `true`
 *   @option {Array|String|RegExp|Function} [options] `filter` black/white list filter
 *   @option {String|Function} [options] `forbidden` custom message when `403 Forbidden` response
 * @return {Function}
 * @api public
 */

module.exports = function expressIpFilter (options) {
  options = typeof options === 'object' ? options : {}

  return function (req, res, next) {
    var id = typeof options.id === 'function' ? options.id.call(this, req, res) : req.ip

    if (!id || !options.filter) {
      next()
      return
    }

    var forbidden = options.forbidden || '403 Forbidden'

    var identifier = ipFilter(id, options.filter, options)
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
