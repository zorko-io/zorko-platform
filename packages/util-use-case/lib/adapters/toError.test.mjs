import test from '@zorko-io/tool-test-harness'
import sinon from 'sinon'

import {MockLogger} from '@zorko-io/util-logger'
import {ValidationError} from '@zorko-io/util-error'
import {toError} from './toError'

test('Happy path If error is instance of ValidationError', (t) => {
  const error = new ValidationError()
  const req = {}
  const res = {send: sinon.stub()}

  toError(error, req, res)

  t.assert(
    res.send.calledOnceWith({
      status: 0,
      error: error.toJSON(),
    }),
    'Should send this object if error instance of ValidationError'
  )

  // t.assert(deps.log instanceof MockLogger, 'Deps should have prop log whitch istanceof MockLogger')
})

test('Happy path if error is NOT instance of ValidationError', (t) => {
  const error = {stack: ''}
  const req = {url: '', params: '', body: ''}
  const res = {send: sinon.stub()}
  const deps = {log: {fatal: sinon.stub()}}

  toError(error, req, res, deps)

  t.assert(
    deps.log.fatal.calledOnceWith({
      REQUEST_URL: req.url,
      REQUEST_PARAMS: req.params,
      REQUEST_BODY: req.body,
      ERROR_STACK: error.stack,
    }),

    'Should be called with this argument if error is NOT instance of ValidationError'
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
