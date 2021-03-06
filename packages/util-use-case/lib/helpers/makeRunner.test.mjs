import test from '@zorko-io/tool-test-harness'
import _ from 'lodash'
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
  const result = {data: {result: 'foo'}}
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
    status: sinon.stub().returns({send: sinon.stub()}),
    send: sinon.stub(),
  }

  let run = sinon.stub()
    .withArgs(params)
    .returns(
      Promise.resolve(_.cloneDeep(result))
    )
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
    t.deepEqual(actual, {...result, status: 1})

    t.assert(res.send.calledOnce, 'should send data')
    t.deepEqual(
      res.send.firstCall.args[0],
      {...result, status: 1},
      'should send proper payload'
    )
  })

test.serial('integration - with custom use case, params, context',
  async (t) => {
    const {run, result, res, req, params, checkContext, context} = t.context

    const runner = makeRunner(UseCaseWithStub, {
      toParams: (req) => ({...req.query}),
      toContext: (req) => (req.session.context)
    })

    const actual = await runner(req, res)

    t.deepEqual(actual, {...result, status: 1})

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

    t.assert(res.status.calledOnce, 'should call once')
    t.assert(res.status().send, 'should call once')
    t.deepEqual(res.status().send.firstCall.args[0], {
      status: 0,
      error: {
        name: err.name,
        message,
        errors
      }
    }, 'should send proper payload')
  })

test.serial('stubs - happy path to run with all custom options and dependencies', async (t) => {
  let {res, req, result, params, context} = t.context

  const toParams = sinon.stub()
  const toContext = sinon.stub()
  const toResult = sinon.stub()
  const toError = sinon.stub()
  const convertedResult = {...result, status: 1}

  toParams.returns(params)
  toContext.returns(context)
  toResult.returns(convertedResult)

  const useCase = new UseCaseWithStub(context)

  const createValidator = sinon.stub()
  const createUseCase = sinon.stub().returns(useCase)
  const log = new MockLogger()
  const provideUseCaseDeps = sinon.stub().returns()

  const runner = makeRunner(UseCaseWithStub, {
    toParams,
    toContext,
    toResult,
    toError
  }, {
    log,
    createValidator,
    createUseCase,
    provideUseCaseDeps
  })

  const actual = await runner(req, res)

  t.assert(createUseCase.calledOnce, 'should create use case')
  t.is(createUseCase.firstCall.args[0], UseCaseWithStub)
  t.is(createUseCase.firstCall.args[1], context)
  t.deepEqual(createUseCase.firstCall.args[2], {
    createValidator,
    log,
    provideUseCaseDeps
  })

  t.assert(toParams, 'should convert params')
  t.is(toParams.firstCall.args[0], req)
  t.is(toParams.firstCall.args[1], res)

  t.assert(toResult.calledOnce, 'should convert result')
  t.deepEqual(toResult.firstCall.args[0], result)
  t.is(toResult.firstCall.args[1], req)
  t.is(toResult.firstCall.args[2], res)

  t.deepEqual(actual, convertedResult)
})

test.serial('stubs - check error scenario', async (t) => {
  let {res, req, result, context} = t.context

  const toResult = sinon.stub()
  const toError = sinon.stub()

  toResult.returns(result)

  let error = new Error('boom!')
  UseCaseWithStub.stubRun = sinon.stub().returns(Promise.reject(error))

  const useCase = new UseCaseWithStub(context)

  const createValidator = sinon.stub()
  const createUseCase = sinon.stub().returns(useCase)
  const log = new MockLogger()
  const provideUseCaseDeps = sinon.stub().returns()

  const runner = makeRunner(UseCaseWithStub, {
    toResult,
    toError
  }, {
    log,
    createValidator,
    createUseCase,
    provideUseCaseDeps
  })

  await runner(req, res)

  t.assert(!toResult.calledOnce, 'should`t convert result')
  t.assert(toError.calledOnce, 'should convert error')
  t.is(toError.firstCall.args[0], error)
  t.is(toError.firstCall.args[1][0], req)
  t.is(toError.firstCall.args[1][1], res)
  t.deepEqual(toError.firstCall.args[2], {
    log
  })
})



