import sinon from 'sinon'
import {AssertionError} from 'assert'
import test from '@zorko-io/tool-test-harness'
import {CoreLogger} from '@zorko-io/util-logger'
import {ApplicationError} from '@zorko-io/util-error'
import {UseCaseWithLogger} from './UseCaseWithLogger'
import {UseCase} from '../core'

test('create UseCase custom logger without origin', async (t) => {
  const log = sinon.createStubInstance(CoreLogger)
  const origin = sinon.createStubInstance(UseCase)
  const name = 'TestUseCase'

  const noOriginError = t.throws(
    () => {
      new UseCaseWithLogger({log, name})
    },
    {instanceOf: AssertionError}
  )
  t.deepEqual(noOriginError.message, 'Should have an origin defined')

  const noLogError = t.throws(
    () => {
      new UseCaseWithLogger({origin, name})
    },
    {instanceOf: AssertionError}
  )
  t.deepEqual(noLogError.message, 'Should have validator log')

  const noNameError = t.throws(
    () => {
      new UseCaseWithLogger({origin, log})
    },
    {instanceOf: AssertionError}
  )
  t.deepEqual(noNameError.message, 'Should have an use case name defined')
})

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
  t.assert(log.info.calledOnce)

  t.deepEqual(log.trace.firstCall.args[0], 'Start use case execution')

  const debugPayload = log.info.firstCall.args[0]
  t.deepEqual(debugPayload.useCase, name, 'should pass use case name')
  t.deepEqual(debugPayload.params, params, 'should pass use case params')
  t.deepEqual(debugPayload.result, result, 'should pass use case result')
  t.assert(debugPayload.runtime > 0, 'should pass use case runtime')

  t.assert(log.trace.calledBefore(origin.run))
  t.assert(log.info.calledAfter(origin.run))
})

test('create UseCase with custom logger and runtime tracking. ApplicationError case', async (t) => {
  const log = sinon.createStubInstance(CoreLogger)
  const origin = sinon.createStubInstance(UseCase)
  const params = {name: 'bbb'}
  const name = 'TestUseCase'
  const error = new ApplicationError('ApplicationError test message')

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
  t.assert(log.warn.calledOnce, 'should pass call warn log once')

  const debugPayload = log.warn.firstCall.args[0]
  t.deepEqual(debugPayload.useCase, name, 'should pass AppError use case name')
  t.deepEqual(debugPayload.params, params, 'should pass AppError use case params')
  t.deepEqual(debugPayload.error, error, 'should pass AppError use case error')
  t.assert(typeof debugPayload.runtime === 'number', 'should pass AppError use case runtime')

  t.assert(log.trace.calledBefore(origin.run))
})

test('create UseCase with custom logger and runtime tracking. Non ApplicationError case', async (t) => {
  const log = sinon.createStubInstance(CoreLogger)
  const origin = sinon.createStubInstance(UseCase)
  const params = {name: 'bbb'}
  const name = 'TestUseCase'
  const error = new Error('ApplicationError test message')

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
  t.assert(log.error.calledOnce, 'should pass call warn log once')

  const debugPayload = log.error.firstCall.args[0]
  t.deepEqual(debugPayload.useCase, name, 'should pass Non AppError use case name')
  t.deepEqual(debugPayload.params, params, 'should pass Non AppError use case params')
  t.deepEqual(debugPayload.error, error, 'should pass Non AppError use case error')
  t.assert(typeof debugPayload.runtime === 'number', 'should pass Non AppError use case runtime')

  t.assert(log.trace.calledBefore(origin.run))
})
