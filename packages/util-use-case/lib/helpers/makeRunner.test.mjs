import test from '@zorko-io/tool-test-harness'
import {UseCase} from '../core'
import {makeRunner} from './makeRunner'
import sinon from 'sinon'
import {MockLogger} from '@zorko-io/util-logger'
import {createValidator as createValidator_} from '@zorko-io/util-validation'
import {createUseCase as createUseCase_} from './createUseCase.mjs'
import {ValidationError} from '@zorko-io/util-error'

class UseCaseWithStub extends UseCase {
  static stubRun = sinon.stub()
  static stubContext = sinon.stub()

  constructor(context = {}) {
    super()

    UseCaseWithStub.stubContext(context)
  }

  async run(params) {
    return UseCaseWithStub.stubRun(params)
  }
}

test.beforeEach((t) => {
  const params = {limit: '10'}
  const result = {data: {result: 'foo'}, status: 1}
  const context = {some: 'boo'}
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
    send: sinon.stub()
  }

  let run = sinon.stub().withArgs(params).returns(Promise.resolve(result))
  let checkContext = sinon.stub()

  UseCaseWithStub.stubRun = run
  UseCaseWithStub.stubContext = checkContext

  t.context = {
    run, result, params, req, res, checkContext, context, deps
  }
})

test.serial('integration - with custom use case and defaults',
  async (t) => {
    const {run, result, req, res} = t.context


    const runner = makeRunner(UseCaseWithStub)

    const actual = await runner(req, res)

    t.assert(run.calledOnce)
    t.deepEqual(run.firstCall.args[0], {})
    t.deepEqual(actual, result)

    t.assert(res.send.calledOnce, 'should send data')
    t.deepEqual(res.send.firstCall.args[0], result, 'should send proper payload')

  })

test.serial('integration - with custom use case, params, context',
  async (t) => {
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

test.serial('integration - with custom use case and throwing core error',
  async (t) => {
    let {res, req} = t.context
    const err = new Error('Boom!')

    UseCaseWithStub.stubRun = sinon.stub().returns(Promise.reject(err))

    const runner = makeRunner(UseCaseWithStub)

    await runner(req, res)

    t.assert(res.send.calledOnce, 'should call once')
    t.deepEqual(res.send.firstCall.args[0], {
      status: 0,
      error: {
        name: 'ServerError',
        message: 'Please, contact your system administrator!'
      }
    }, 'should send proper payload')
  })


test.serial('integration - with custom use case and throwing validation error',
  async (t) => {
    let {res, req} = t.context
    const message = 'Boom!'
    const errors = {
      'field1': 'value1'
    }

    const err = new ValidationError({errors, message})

    UseCaseWithStub.stubRun = sinon.stub().returns(Promise.reject(err))

    const runner = makeRunner(UseCaseWithStub)

    await runner(req, res)

    t.assert(res.send.calledOnce, 'should call once')
    t.deepEqual(res.send.firstCall.args[0], {
      status: 0,
      error: {
        name: err.name,
        message,
        errors
      }
    }, 'should send proper payload')
  })

// TODO: gh-55 - stubbed tests

