import test from '@zorko-io/tool-test-harness'
import {createUseCase} from './createUseCase'
import {UseCase} from '../core'

test('creates UseCase', (t) => {

  const rules = { name: 'required'}

  class MockUseCase extends UseCase {
    static rules = rules
  }

  const useCase = createUseCase(MockUseCase, {})

  t.assert(useCase)
})
