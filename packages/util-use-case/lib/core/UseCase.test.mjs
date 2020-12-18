import test from '@zorko-io/tool-test-harness'
import {AssertionError} from 'assert'
import {UseCase} from './UseCase'
import {NotYetImplementedError} from '@zorko-io/util-error'

test('create UseCase with default context', async (t) => {
  const useCase = new UseCase()

  t.deepEqual(useCase.context, {})

  let rules = await useCase.rules()
  t.is(rules, null)
  t.assert(useCase)
})

test('fails creation of UseCase with custom context', async (t) => {
 t.throws(() => {
    new UseCase(null)
  }, {
    instanceOf: AssertionError,
    message: 'UseCase should have a context defined'
  })
})

test('has not implemented run method', async (t) => {
  const useCase = new UseCase()

  await t.throwsAsync(() => {
     return useCase.run({})
  }, {
    instanceOf: NotYetImplementedError
  })
})
