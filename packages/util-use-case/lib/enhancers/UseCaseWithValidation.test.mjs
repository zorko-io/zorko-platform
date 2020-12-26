import test from '@zorko-io/tool-test-harness'
import {UseCaseWithValidation} from './UseCaseWithValidation'
import {UseCase} from '../core'
import sinon from 'sinon'
import {Validator} from '@zorko-io/util-validation'

test.beforeEach((t) => {
  const origin = sinon.createStubInstance(UseCase)
  const params = {name: 'bbb'}
  const result = {name: 'required'}
  const rules = {name: 'required'}
  const validator = sinon.createStubInstance(Validator)
  const createValidator = sinon.stub()

  origin.rules.returns(Promise.resolve(rules))

  origin
    .run
    .withArgs(params)
    .returns(Promise.resolve(result))


  createValidator
    .withArgs(rules)
    .returns(validator)

  validator
    .parse
    .withArgs(params)
    .returns(Promise.resolve({
      result: params,
      error: null
    }))

  t.context = {origin, params, result, rules, createValidator, validator}
})

test('create UseCase with default context', async (t) => {
  const {createValidator, origin, result, params} = t.context

  origin.rules.returns(null)

  const useCase = new UseCaseWithValidation({
    origin,
    createValidator
  })

  const actual = await useCase.run(params)

  t.is(actual, result)
  t.assert(origin.run.calledOnce)
})

test(`creates and trigger validation if rules defined`, async (t) => {
  const {createValidator, origin, result, params, validator} = t.context

  const useCase = new UseCaseWithValidation({
    origin,
    createValidator
  })

  const actual = await useCase.run(params)

  t.is(actual, result)
  t.assert(createValidator.calledOnce, 'should create validator')
  t.assert(validator.parse.calledOnce, 'should call parser')
  t.assert(origin.run.calledOnce, 'should call origin')
})


test(`creates and trigger validation if static rules defined`, async (t) => {
  const {createValidator, result, params, validator} = t.context

  class UseCaseWithStaticRules extends UseCase {
    static rules = {name: 'required'}
  }

  const origin = sinon.createStubInstance(UseCaseWithStaticRules)

  origin.rules.returns(null)
  origin.run.withArgs(params).returns(Promise.resolve(result))

  const useCase = new UseCaseWithValidation({
    origin,
    createValidator
  })

  const actual = await useCase.run(params)

  t.is(actual, result)
  t.assert(validator.parse.calledOnce, 'should call parser')
  t.assert(origin.run.calledOnce, 'should call origin')

  await useCase.run(params)

  t.assert(createValidator.calledOnce, 'should create validator')
})


