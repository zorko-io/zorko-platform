import test from '@zorko-io/tool-test-harness'
import {UseCase} from '../core'
import {makeRunner} from './makeRunner'
import sinon from 'sinon'

class UseCaseWithStub extends UseCase {

  static stubRun = sinon.stub()

  async run (params) {
    return UseCaseWithStub.stubRun(params)
  }
}

test.beforeEach((t) => {
  const params = { limit: '10'}
  const result = { data: { result: 'aaaa'}}
  const req = {
    query: params
  }
  const res = {
    send : () => {}
  }

  let run = sinon.stub().withArgs(params).returns(Promise.resolve(result))
  UseCaseWithStub.stubRun = run

  t.context = {
    run, result, params, req, res
  }
})


// TODO: gh-55 cover with unit tests, with defaults and subbed deps
test.serial('run with defaults', async (t) => {
  const {run, result, req, res} = t.context


  const runner = makeRunner(UseCaseWithStub)

  const actual = await runner(req, res)

  t.assert(run.calledOnce)
  t.deepEqual(run.firstCall.args[0], {})
  t.deepEqual(actual, result)
})

test.serial('run with params', async (t) => {
  const {run, result, res, req, params} = t.context

  const runner = makeRunner(UseCaseWithStub, {
    toParams: ({query}) => ({...query})
  })

  const actual = await runner(req, res)

  t.assert(run.calledOnce)
  t.deepEqual(run.firstCall.args[0], params)
  t.deepEqual(actual, result)

})
