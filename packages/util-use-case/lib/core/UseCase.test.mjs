import test from '@zorko-io/tool-test-harness'
import {AssertionError} from 'assert'
import {UseCase} from './UseCase'

test('create UseCase with default context', async (t) => {
  const useCase = new UseCase()

  t.deepEqual(useCase.context, {})
  t.assert(useCase)
})

test('fails creation of UseCase with custom context', async (t) => {
  const error = t.throws(() => {
    new UseCase(null)
  }, {instanceOf: AssertionError})

  t.is(error.message, 'UseCase should have a context defined')
})
