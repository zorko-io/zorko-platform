import test from '@zorko-io/tool-test-harness'
import sinon from 'sinon'
import {ValidationError} from '@zorko-io/util-error'
import {toError} from './toError'

test.beforeEach((t) => {
  const res = {status: sinon.stub().returns({send: sinon.stub()}), send: sinon.stub()}
  const deps = {log: {fatal: sinon.stub(), info: sinon.stub()}}
  t.context = {
    res, deps
  }
})

test('Happy path If error is instance of ValidationError', (t) => {
  const error = new ValidationError()
  const req = {}
  const {res, deps} = t.context

  toError(error, [req, res], deps)

  let json = error.toJSON()
  t.assert(
    res.status.calledOnceWith(400),
    'Should set 400 status for ValidationError'
  )

  t.assert(
    res.status().send.calledOnceWith({
      status: 0,
      error: json,
    }),
    'Should send this object if error instance of ValidationError'
  )

  t.assert(
    deps.log.fatal.notCalled,
    'log.fatal should not been called if error is instance of ValidationError'
  )

  t.assert(
    deps.log.info.calledOnceWith({
      error: json
    }),
    'log.info should been called once'
  )
})

test('Happy path if error is NOT instance of ValidationError', (t) => {
  const error = {stack: ''}
  const req = {url: '', params: '', body: ''}
  const {res, deps} = t.context

  toError(error, [req, res], deps)

  t.assert(
    deps.log.fatal.calledOnceWith({
      REQUEST_URL: req.url,
      REQUEST_PARAMS: req.params,
      REQUEST_BODY: req.body,
      ERROR_STACK: error.stack,
    }),

    'Should been called with this argument if error is NOT instance of ValidationError'
  )

  t.assert(
    res.status.notCalled,
    'Should not call status if error is NOT instance of ValidationError'
  )

  t.assert(
    res.send.calledOnceWith({
      status: 0,
      error: {
        name: 'ServerError',
        message: 'Please, contact your system administrator!',
      },
    }),
    'Should send this object if error is NOT instance of ValidationError'
  )
})
