/*!
 * express-ip-filter <https://github.com/tunnckoCore/express-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var ipFilter = require('./index')
var request = require('supertest')
var helloWorld = require('express-hello-world')
var express = require('express')

function middleware (fn) {
  return express().use(fn).use(helloWorld())
}

test('express-ip-filter:', function () {
  test('should yield next middleware if no `opts.filter` given', function (done) {
    var server = middleware(ipFilter())

    request(server)
      .get('/')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should have `opts.id` and it should be binded to koa this', function (done) {
    var server = middleware(ipFilter({
      id: function _id_ (req, res) {
        res.set('x-github-username', 'tunnckoCore')
        return req.get('x-expressip')
      }
    }))

    request(server)
      .get('/')
      .expect('x-github-username', 'tunnckoCore')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should `403 Forbidden` if not match to `opts.filter`', function (done) {
    var server = middleware(ipFilter({
      id: function (req, res) {
        return req.get('x-expressip')
      },
      filter: '1.2.3.*'
    }))

    request(server)
      .get('/')
      .set('x-expressip', '4.4.8.8')
      .expect(403, '403 Forbidden')
      .end(done)
  })
  test('should `403 Forbidden` if IP is in blacklist', function (done) {
    var server = middleware(ipFilter({
      id: function (req) {
        return req.get('x-expressip')
      },
      filter: ['*', '!89.???.30.*']
    }))

    request(server)
      .get('/')
      .set('x-expressip', '89.111.30.8')
      .expect(403, '403 Forbidden')
      .end(done)
  })
  test('should `200 OK` if not in blacklist range', function (done) {
    var server = middleware(ipFilter({
      id: function (req) {
        return req.get('x-expressip')
      },
      filter: ['*', '!89.???.30.*']
    }))

    request(server)
      .get('/')
      .set('x-expressip', '4.4.8.8')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should support custom message for 403 Forbidden', function (done) {
    var server = middleware(ipFilter({
      id: function (req) {
        return req.get('x-expressip')
      },
      filter: ['*', '!89.???.30.*'],
      forbidden: '403, Get out of here!'
    }))

    request(server)
      .get('/')
      .set('x-expressip', '89.111.30.8')
      .expect(403, '403, Get out of here!')
      .end(done)
  })
  test('should be able `opts.forbidden` to be function', function (done) {
    var server = middleware(ipFilter({
      id: function (req) {
        return req.get('x-expressip')
      },
      filter: '123.225.23.120',
      forbidden: function (req, res) {
        res.set('X-Forbidden', 'Can be function')
        res.set('X-Seriously', 'yes')
        return 'opts.forbidden can be function'
      }
    }))

    request(server)
      .get('/')
      .set('x-expressip', '55.55.55.55')
      .expect('X-Forbidden', 'Can be function')
      .expect('X-Seriously', 'yes')
      .expect(403, 'opts.forbidden can be function')
      .end(done)
  })
  test('should have `res.filter` and `res.identifier` in next middleware', function (done) {
    var ok = false
    var server = express()
    .use(ipFilter({
      filter: ['*', '!213.15.*']
    }))
    .use(helloWorld())
    .use(function (req, res, next) {
      test.ok(res.filter, 'should have `res.filter` in next')
      test.ok(res.identifier, 'should have `res.identifier` in next')
      test.equal(typeof res.filter, 'function', 'should have `res.filter` method')
      test.equal(typeof res.identifier, 'string', 'should have `res.identifier`')
      ok = true
      next()
    })

    request(server)
      .get('/')
      .set('x-expressip', '7.7.7.7')
      .expect(200, 'Hello World')
      .end(function (err) {
        test.ifError(err)
        test.equal(ok, true)
        done()
      })
  })
  test('should not have `res.filter` if no `opts.filter` given', function (done) {
    var ok = false
    var server = express().use(ipFilter()).use(helloWorld()).use(function (req, res, next) {
      test.ok(!res.filter, 'should not have `res.filter` in next')
      test.ok(!res.identifier, 'should not have `res.identifier` in next')
      ok = true
      next
    })

    request(server)
      .get('/')
      .expect(200, 'Hello World')
      .end(function (err) {
        test.ifError(err)
        test.equal(ok, true)
        done()
      })
  })
})
