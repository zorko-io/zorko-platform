import test from '@zorko-io/tool-test-harness'
import {UseCase} from '../core'
import {makeRunner} from './makeRunner'
import sinon from 'sinon'


class MockUseCase extends UseCase {

  async run (params) {
    return {params}
  }

}

class UseCaseWithStub extends UseCase {

  static stubRun = sinon.stub()

  async run (params) {
    return UseCaseWithStub.stubRun(params)
  }
}

// TODO: gh-55 cover with unit tests
test.serial('run with defaults', async (t) => {
  let run = sinon.stub()
  UseCaseWithStub.stubRun = run

  const runner = makeRunner(UseCaseWithStub)

  await runner()

  t.assert(run.calledOnce)
  t.deepEqual(run.firstCall.args[0], {})
})

test.serial('run with  params', async (t) => {
  const query = { limit: '10'}
  const result = { data: { result: 'aaaa'}}

  let run = sinon.stub().returns(Promise.resolve(result))
  UseCaseWithStub.stubRun = run

  const runner = makeRunner(UseCaseWithStub, {
    toParams: ({query}) => ({...query})
  })

  const req = {
    query
  }

  const res = {
    send : () => {}
  }

  const actual = await runner(req, res)

  t.assert(run.calledOnce)
  t.deepEqual(run.firstCall.args[0], query)
  t.deepEqual(actual, result)

})
