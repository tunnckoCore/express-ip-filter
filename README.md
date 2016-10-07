# [express-ip-filter][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Middleware for [express][] that filters IPs against glob patterns, RegExp, string or array of globs. Support custom `403 Forbidden` message, blacklists, whitelists and custom ID.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install

```
npm i express-ip-filter --save
```

## Features
- custom message when `403 Forbidden` response, through `opts.forbidden`
- custom identifier different than default `this.ip`, through `opts.id`
  + you may want to add `opts.strict: false` if it's not IP
- filter IP using glob patterns, regexp, string, array or function
- blacklist with negative glob patterns, whitelist with positive
- would restrict all to `403 Forbidden` that not match to filter

> **Notice:** In the next middleware you will have `this.filter` method which is [ip-filter][]
> and `this.identifier` - the IP/ID that passed the given filter

## Usage
> For more use-cases see the [tests](./test.js)

```js
const expressIpFilter = require('express-ip-filter')
```

### [expressIpFilter](index.js#L51)
> Filtering incoming request with glob patterns array, regexp, string or matcher function

**Params**

* `options` **{Object}**  
  - `id` **{Function}**: custom identifier, defaults to `this.ip`
  - `strict` **{Boolean}**: to throw when not valid IPv4/IPv6? default `true`
  - `filter` **{Array|String|RegExp|Function}**: black/white list filter
  - `forbidden` **{String|Function}**: custom message when `403 Forbidden` response
* `returns` **{Function}**  

**Example**

```js
'use strict'

var express = require('express')
var ipFilter = require('express-ip-filter')
var helloWorld = require('express-hello-world')

var app = express()

app
.use(ipFilter({
  forbidden: '403: Get out of here!',
  filter: ['127.??.6*.12', '!1.2.*.4']
}))
.use(helloWorld())

app.listen(1234)
console.log('express server start listening on http://localhost:1234')

// if your IP is `127.43.65.12` you will see `Hello World`
// otherwise you will see `403: Get out of here!`
```

### One more example
> If you want to allow all IPs, but want to restrict only some range

```js
'use strict'

var express = require('express')
var ipFilter = require('express-ip-filter')
var helloWorld = require('express-hello-world')

var app = express()

app
.use(ipFilter({
  forbidden: '403: Get out of here!',
  filter: ['*', '!213.15.*']
}))
.use(helloWorld())

app.listen(1234)
console.log('express server start listening on http://localhost:1234')

// only user with IP starting with `213.15.*` 
// will see the message `403: Get out of here!`
```

## Related
- [ip-filter](https://www.npmjs.com/package/ip-filter): Validates valid IPs (IPv4 and IPv6) using [micromatch][] - glob patterns, RegExp… [more](https://github.com/tunnckocore/ip-filter#readme) | [homepage](https://github.com/tunnckocore/ip-filter#readme "Validates valid IPs (IPv4 and IPv6) using [micromatch][] - glob patterns, RegExp, string or array of globs. If match returns the IP, otherwise null.")
- [is-match-ip](https://www.npmjs.com/package/is-match-ip): Matching IPs using [micromatch][] and [ip-filter][] - glob patterns, RegExp, string or… [more](https://github.com/tunnckocore/is-match-ip#readme) | [homepage](https://github.com/tunnckocore/is-match-ip#readme "Matching IPs using [micromatch][] and [ip-filter][] - glob patterns, RegExp, string or array of globs. Returns matcher function.")
- [is-match](https://www.npmjs.com/package/is-match): Create a matching function from a glob pattern, regex, string, array, object… [more](https://github.com/jonschlinkert/is-match) | [homepage](https://github.com/jonschlinkert/is-match "Create a matching function from a glob pattern, regex, string, array, object or function.")
- [koa-better-body](https://www.npmjs.com/package/koa-better-body): Full-featured [koa][] body parser! Support parsing text, buffer, json, json patch, json… [more](https://github.com/tunnckocore/koa-better-body#readme) | [homepage](https://github.com/tunnckocore/koa-better-body#readme "Full-featured [koa][] body parser! Support parsing text, buffer, json, json patch, json api, csp-report, multipart, form and urlencoded bodies. Works for koa@1, koa@2 and will work for koa@3.")
- [koa-ip-filter](https://www.npmjs.com/package/koa-ip-filter): Middleware for [koa][] that filters IPs against glob patterns, RegExp, string or… [more](https://github.com/tunnckocore/koa-ip-filter#readme) | [homepage](https://github.com/tunnckocore/koa-ip-filter#readme "Middleware for [koa][] that filters IPs against glob patterns, RegExp, string or array of globs. Support custom `403 Forbidden` message and custom ID.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/express-ip-filter/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[express]: http://expressjs.com/
[ip-filter]: https://github.com/tunnckocore/ip-filter
[koa]: https://github.com/koajs/koa
[micromatch]: https://github.com/jonschlinkert/micromatch

[npmjs-url]: https://www.npmjs.com/package/express-ip-filter
[npmjs-img]: https://img.shields.io/npm/v/express-ip-filter.svg?label=express-ip-filter

[license-url]: https://github.com/tunnckoCore/express-ip-filter/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/express-ip-filter.svg

[downloads-url]: https://www.npmjs.com/package/express-ip-filter
[downloads-img]: https://img.shields.io/npm/dm/express-ip-filter.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/express-ip-filter
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/express-ip-filter.svg

[travis-url]: https://travis-ci.org/tunnckoCore/express-ip-filter
[travis-img]: https://img.shields.io/travis/tunnckoCore/express-ip-filter/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/express-ip-filter
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/express-ip-filter.svg

[david-url]: https://david-dm.org/tunnckoCore/express-ip-filter
[david-img]: https://img.shields.io/david/tunnckoCore/express-ip-filter.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

