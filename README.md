# express-ip-filter [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Express middleware to filter IPs with glob patterns, string, array or function, with blacklist and whitelist options, plus custom identifier

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i express-ip-filter --save
npm test
```


## Features
- custom message when `403 Forbidden` response, through `opts.forbidden`
- custom identifier different than default `req.ip`, through `opts.id`
  + you may want to add `opts.strict: false` if it's not IP
- filter IP using glob patterns, regexp, string, array or function
- blacklist with negative glob patterns, whitelist with positive
- would restrict all to `403 Forbidden` that not match to filter


## Usage
> For more use-cases see the [tests](./test.js)

### [expressIpFilter](./index.js#L50)
> Filtering incoming request with glob patterns array, regexp, string or matcher function

- `options` **{Object}**
  + `id` **{Function}** custom identifier, defaults to `req.ip`
  + `strict` **{Boolean}** to throw when not valid IPv4/IPv6? default `true`
  + `filter` **{Array|String|RegExp|Function}** filter
  + `forbidden` **{String|Function}** custom message when `403 Forbidden` response
- `returns` **{Function}** thunk

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


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/express-ip-filter/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/express-ip-filter
[npmjs-img]: https://img.shields.io/npm/v/express-ip-filter.svg?label=express-ip-filter

[license-url]: https://github.com/tunnckoCore/express-ip-filter/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/express-ip-filter
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/express-ip-filter.svg

[travis-url]: https://travis-ci.org/tunnckoCore/express-ip-filter
[travis-img]: https://img.shields.io/travis/tunnckoCore/express-ip-filter.svg

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

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
