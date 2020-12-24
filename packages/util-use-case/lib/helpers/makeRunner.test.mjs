import test from '@zorko-io/tool-test-harness'
import {UseCase} from '../core'
import {makeRunner} from './makeRunner'
import sinon from 'sinon'
import {MockLogger} from '@zorko-io/util-logger'
import {createValidator as createValidator_} from '@zorko-io/util-validation'
import {createUseCase as createUseCase_} from './createUseCase.mjs'

class UseCaseWithStub extends UseCase {
  static stubRun = sinon.stub()
  static stubContext = sinon.stub()

  constructor(context = {}) {
    super();

    UseCaseWithStub.stubContext(context)
  }

  async run (params) {
    return UseCaseWithStub.stubRun(params)
  }
}

test.beforeEach((t) => {
  const params = { limit: '10'}
  const result = { data: { result: 'aaaa'}}
  const context = {somedata: 'blblblb'}
  const deps = {
    log: new MockLogger(),
    createValidator: createValidator_,
    createUseCase: createUseCase_
  }

  const req = {
    query: params,
    session: {
      context
    }
  }
  const res = {
    send : () => {}
  }

  let run = sinon.stub().withArgs(params).returns(Promise.resolve(result))
  let checkContext = sinon.stub()

  UseCaseWithStub.stubRun = run
  UseCaseWithStub.stubContext = checkContext

  t.context = {
    run, result, params, req, res, checkContext, context, deps
  }
})

// TODO: gh-55 cover with unit tests, with defaults and subbed deps
test.serial('with custom use case and defaults', async (t) => {
  const {run, result, req, res} = t.context


  const runner = makeRunner(UseCaseWithStub)

  const actual = await runner(req, res)

  t.assert(run.calledOnce)
  t.deepEqual(run.firstCall.args[0], {})
  t.deepEqual(actual, result)
})

test.serial('with custom use case and params, context', async (t) => {
  const {run, result, res, req, params, checkContext, context} = t.context

  const runner = makeRunner(UseCaseWithStub, {
    toParams: (req) => ({...req.query}),
    toContext: (req) => (req.session.context)
  })

  const actual = await runner(req, res)

  t.deepEqual(actual, result)

  t.assert(run.calledOnce)
  t.deepEqual(run.firstCall.args[0], params)

  t.assert(checkContext.calledOnce)
  t.deepEqual(checkContext.firstCall.args[0], context)


})
