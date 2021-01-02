import test from '@zorko-io/tool-test-harness'
import sinon from 'sinon'
import {CoreLogger} from '@zorko-io/util-logger'
import {UseCaseWithLogger} from './UseCaseWithLogger'
import {UseCase} from '../core'

test('create UseCase with custom logger and runtime tracking', async (t) => {
  const log = sinon.createStubInstance(CoreLogger)
  const origin = sinon.createStubInstance(UseCase)
  const params = {name: 'bbb'}
  const result = {name: 'required'}
  const name = 'TestUseCase'

  log.child.returns(log)

  origin.run.withArgs(params).returns(Promise.resolve(result))

  const useCase = new UseCaseWithLogger({
    origin,
    log,
    name,
  })

  const actual = await useCase.run(params)

  t.is(actual, result)

  t.assert(origin.run.calledOnce)
  t.assert(log.debug.calledOnce)

  t.deepEqual(log.trace.firstCall.args[0], 'Start use case execution')

  const debugPayload = log.debug.firstCall.args[0]
  t.deepEqual(debugPayload.useCase, name)
  t.deepEqual(debugPayload.params, params)
  t.deepEqual(debugPayload.result, result)
  t.assert(debugPayload.runtime > 0)

  t.assert(log.trace.calledBefore(origin.run))

  t.deepEqual(log.info.firstCall.args[0], 'Finish use case execution')
  t.assert(log.info.calledAfter(origin.run))
})

test('create UseCase with custom logger and runtime tracking. Error case', async (t) => {
  const log = sinon.createStubInstance(CoreLogger)
  const origin = sinon.createStubInstance(UseCase)
  const params = {name: 'bbb'}
  const name = 'TestUseCase'
  const error = {code: 'CUSTOM_ERROR', message: 'Error message', stack: 'test stacktrace'}

  log.child.returns(log)

  origin.run.withArgs(params).returns(Promise.reject(error))

  const useCase = new UseCaseWithLogger({
    origin,
    log,
    name,
  })

  await useCase.run(params).catch((err) => {
    t.assert(err)
  })

  t.assert(origin.run.calledOnce)
  t.assert(log.debug.calledOnce)
  t.deepEqual(log.error.firstCall.args[0], 'Issues with running use case')

  const debugPayload = log.debug.firstCall.args[0]
  t.deepEqual(debugPayload.useCase, name)
  t.deepEqual(debugPayload.params, params)
  t.deepEqual(debugPayload.error, error)
  t.assert(debugPayload.runtime > 0)

  t.assert(log.trace.calledBefore(origin.run))
})
