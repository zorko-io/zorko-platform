import test from '@zorko-io/tool-test-harness'
import {UseCaseWithValidation} from './UseCaseWithValidation.mjs'
import {UseCase} from '../core'

test('create UseCase with default context', async (t) => {

  const createValidator = () => {}

  const useCase = new UseCaseWithValidation({
    origin: new UseCase(),
    createValidator
  })

  t.assert(useCase)
})
