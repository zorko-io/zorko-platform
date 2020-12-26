import test from '@zorko-io/tool-test-harness'
import sinon from 'sinon'
import {UseCaseWithLogger} from './UseCaseWithLogger'
import {UseCase} from '../core'
import {CoreLogger} from '@zorko-io/util-logger'

// TODO: gh-80 check constructor asserts

test('create UseCase with custom logger', async (t) => {
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
    name
  })

  const actual = await useCase.run(params)

  t.is(actual, result)

  t.assert(origin.run.calledOnce)

  t.deepEqual(log.trace.firstCall.args[0], 'Start use case execution')
  t.assert(log.trace.calledBefore(origin.run))

  t.deepEqual(log.info.firstCall.args[0], 'Finish use case execution')
  t.assert(log.info.calledAfter(origin.run))

})
