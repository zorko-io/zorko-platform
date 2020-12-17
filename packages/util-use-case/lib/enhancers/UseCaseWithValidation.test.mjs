import test from '@zorko-io/tool-test-harness'
import {UseCaseWithValidation} from './UseCaseWithValidation.mjs'
import {UseCase} from '../core'
import sinon from 'sinon'

test('create UseCase with default context', async (t) => {

  const createValidator = () => {}

  const origin = sinon.createStubInstance(UseCase)
  const params = {}
  const result = {}

  origin.run.returns(Promise.resolve(result))

  const useCase = new UseCaseWithValidation({
    origin,
    createValidator
  })

  const actual = await useCase.run(params)

  t.is(actual, result)

  t.assert(origin.run.calledOnce)
  t.deepEqual(origin.run.firstCall.args[0], params)
})
