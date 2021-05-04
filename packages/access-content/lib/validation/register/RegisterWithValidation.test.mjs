import test from '@zorko-io/tool-test-harness'
import {RegisterAccessWithValidation} from './RegisterWithValidation'
import {RegisterAccess} from '../../core'
import sinon from 'sinon'
import {ResourceAccessError} from '@zorko-io/util-error'

test.beforeEach((t) => {
  const sandbox = sinon.createSandbox()
  const origin = sandbox.createStubInstance(RegisterAccess)
  const returnResult = 'some-result'

  origin.add.returns(returnResult)
  origin.get.returns(returnResult)
  origin.remove.returns(returnResult)
  origin.iterate.returns(returnResult)

  const register = new RegisterAccessWithValidation({
    origin
  })

  t.context = {
    register,
    origin,
    returnResult,
    sandbox
  }
})

test.afterEach((t) => {
  t.context.sandbox.restore()
})

test('add - check required and format params', async (t) => {
  const { register } = t.context

  await t.throwsAsync( async () => {
    await register.add({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"repo":"REQUIRED","owner":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await register.add({
      repo: {},
      owner: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"repo":"FORMAT_ERROR","owner":"FORMAT_ERROR"}',
  })
})

test('iterate - check required and format params', (t) => {
  const { register } = t.context

  t.throws(() => {
    register.iterate({
      owner: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"owner":"FORMAT_ERROR"}',
  })
})