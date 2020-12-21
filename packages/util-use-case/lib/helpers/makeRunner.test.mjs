import test from '@zorko-io/tool-test-harness'
import {UseCase} from '../core'
import {makeRunner} from './makeRunner'

// TODO: gh-55 cover with unit tests
test('run simple UseCase with defaults', async (t) => {

  // const rules = { name: 'required'}

  class MockUseCase extends UseCase {

    async run (params) {
      return {params}
    }

  }

  const runner = makeRunner(MockUseCase)

  await runner({})

  t.assert(runner)
})
