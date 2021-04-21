import test from '@zorko-io/tool-test-harness'
import {ContentAccessWithValidation} from './ContentAccessWithValidation'
import {ContentAccess, MimeTypes} from '../../core'
import sinon from 'sinon'
import {ResourceAccessError} from '@zorko-io/util-error'

test.beforeEach((t) => {
  const sandbox = sinon.createSandbox()
  const origin = sandbox.createStubInstance(ContentAccess)
  const returnResult = 'some-result'

  origin.add.returns(returnResult)
  origin.get.returns(returnResult)
  origin.remove.returns(returnResult)
  origin.iterate.returns(returnResult)

  const access = new ContentAccessWithValidation({origin})

  t.context = {
    access,
    origin,
    returnResult,
    sandbox
  }
})

test.afterEach((t)=>{
  t.context.sandbox.restore()
})

test('add - check delegation to origin', async (t) => {
  const { access, origin, returnResult } = t.context

  const actual  = await access.add({
    content: {
      mime: MimeTypes.VegaLite,
      content: {}
    },
    repository: {
      name: 'some-repo',
      owner: 'joe'
    }
  })

  t.true(origin.add.calledOnce, '#add(...) should be called once')
  t.deepEqual(actual, returnResult)
})

test('get - check delegation to origin', async (t) => {
  const { access, origin, returnResult } = t.context

  const actual  = await access.get({
    id: 'some-id',
    repository: 'some-repo',
    owner: 'joe'
  })

  t.true(origin.get.calledOnce, '#get(...) should be called once')
  t.deepEqual(actual, returnResult)
})

test('iterate - check delegation to origin', (t) => {
  const { access, origin, returnResult } = t.context

  const actual = access.iterate({repository: {
      name: 'my-repo',
      owner: 'joe'
    }})

  t.true(origin.iterate.calledOnce, '#iterate(...) should be called once')
  t.deepEqual(actual, returnResult)
})

test('remove - check delegation to origin', async (t) => {
  const { access, origin, returnResult } = t.context

  const actual  = await access.remove({
    id: 'some-id',
    repository: 'some-repo',
    owner: 'joe'
  })

  t.true(origin.remove.calledOnce, '#remove(...) should be called once')
  t.deepEqual(actual, returnResult)
})


test('add - check required params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.add({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"content":"REQUIRED","repository":"REQUIRED"}'
  })

  await t.throwsAsync( async () => {
    await access.add({
      content: {},
      repository: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"content":{"mime":"REQUIRED","content":"REQUIRED"},"repository":{"name":"REQUIRED","owner":"REQUIRED"}}',
  })
})

test('add - check proper formats', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.add({
      content: 'fdfdfdf',
      repository: 'dfdfdffd'
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"content":"FORMAT_ERROR","repository":"FORMAT_ERROR"}'
  })

  await t.throwsAsync( async () => {
    await access.add({
      content: {
        mime: {},
        content: 'dfdfdfd',
        config: 123
      },
      repository: {
        name: [],
        owner: {},
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"content":{"mime":"FORMAT_ERROR","content":"FORMAT_ERROR","config":"FORMAT_ERROR"},"repository":{"name":"FORMAT_ERROR","owner":"FORMAT_ERROR"}}'
  })
})

test('get - check required and format params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.get({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"id":"REQUIRED","repository":"REQUIRED","owner":"REQUIRED"}'
  })

  await t.throwsAsync( async () => {
    await access.get({
      id: {},
      repository: {},
      owner: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"id":"FORMAT_ERROR","repository":"FORMAT_ERROR","owner":"FORMAT_ERROR"}',
  })
})

test('remove - check required and format params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.remove({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"id":"REQUIRED","repository":"REQUIRED","owner":"REQUIRED"}'
  })

  await t.throwsAsync( async () => {
    await access.remove({
      id: {},
      repository: {},
      owner: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"id":"FORMAT_ERROR","repository":"FORMAT_ERROR","owner":"FORMAT_ERROR"}',
  })
})
