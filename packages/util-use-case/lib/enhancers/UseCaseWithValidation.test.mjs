import test from '@zorko-io/tool-test-harness'
import {UseCaseWithValidation} from './UseCaseWithValidation.mjs'
import {UseCase} from '../core'
import sinon from 'sinon'
import {Validator} from '@zorko-io/util-validation'

test('create UseCase with default context', async (t) => {
  const createValidator = () => {
  }
  const origin = sinon.createStubInstance(UseCase)
  const params = {}
  const result = {}

  origin.run.returns(Promise.resolve(result))

  const useCase = new UseCaseWithValidation({
    origin,
    createValidator
  })

  const actual = await useCase.run(params)

  t.is(actual, result)

  t.assert(origin.run.calledOnce)
  t.deepEqual(origin.run.firstCall.args[0], params)
})

test('creates and trigger validation if rules defined', async (t) => {
  const rules = {name: 'required'}
  const validator = sinon.createStubInstance(Validator)

  const createValidator = sinon.stub().withArgs(rules).returns(validator)

  const origin = sinon.createStubInstance(UseCase)
  const params = {name: 'bbb'}
  const result = {data: 'some result'}

  validator.parse
    .withArgs(params)
    .returns(Promise.resolve({
      result: params,
      error: null
    }))

  origin.rules.returns(Promise.resolve(rules))
  origin.run.returns(Promise.resolve(result))

  const useCase = new UseCaseWithValidation({
    origin,
    createValidator
  })

  const actual = await useCase.run(params)

  t.is(actual, result)
  t.assert(validator.parse.calledOnce, 'should call parser')
  t.assert(origin.run.calledOnce, 'should call origin')
})


