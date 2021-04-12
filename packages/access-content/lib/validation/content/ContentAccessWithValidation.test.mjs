import test from '@zorko-io/tool-test-harness'
import {ContentAccessWithValidation} from './ContentAccessWithValidation'
import {ContentAccess, MimeTypes} from '../../core'
import sinon from 'sinon'
import {ResourceAccessError, ValidationError} from '@zorko-io/util-error/lib/index.mjs'

test.beforeEach((t) => {
  const origin = sinon.createStubInstance(ContentAccess)
  const addResult = 'add-result'

  origin.add.returns(addResult)

  const access = new ContentAccessWithValidation({origin})

  t.context = {
    access,
    origin,
    addResult
  }
})

test('add - check delegation to origin', async (t) => {
  const { access, origin, addResult } = t.context

  const actual  = await access.add({
    content: {},
    mime: MimeTypes.VegaLite,
    repo: 'some-repo',
    owner: 'joe'
  })

  t.true(origin.add.calledOnce, '#add(...) should be called once')
  t.deepEqual(actual, addResult)
})

test('add - check required params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.add({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"content":"REQUIRED","mime":"REQUIRED","repo":"REQUIRED","owner":"REQUIRED"}'
  })
})

test('add - check proper formats', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.add({
      mime: {},
      repo: [],
      owner: {},
      content: 'dfdfdfd',
      config: 123
    })
  }, {
    instanceOf: ResourceAccessError,
    message: `ValidationError: {"content":"FORMAT_ERROR","mime":"FORMAT_ERROR","config":"FORMAT_ERROR","repo":"FORMAT_ERROR","owner":"FORMAT_ERROR"}`
  })
})