import test from '@zorko-io/tool-test-harness'
import {ContentAccessWithValidation} from './ContentAccessWithValidation'
import {ContentAccess} from '../../core'
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

test('readMetadata - check required params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.readMetadata({})
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await access.readMetadata({
      uri: {},
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"uri":{"repo":"REQUIRED","owner":"REQUIRED","path":"REQUIRED"}}',
  })
})

test('readMetadata - check formatting', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.readMetadata({
      uri: [],
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":"FORMAT_ERROR"}',
  })

  await t.throwsAsync( async () => {
    await access.readMetadata({
      uri: {
        repo: [],
        owner: {},
        path: {}
      },
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":{"repo":"FORMAT_ERROR","owner":"FORMAT_ERROR","path":"FORMAT_ERROR"}}',
  })
})

test('removeContent - check required params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.removeContent({})
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await access.removeContent({
      uri: {},
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"uri":{"repo":"REQUIRED","owner":"REQUIRED","path":"REQUIRED"}}',
  })
})

test('removeContent - check formatting', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.removeContent({
      uri: [],
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":"FORMAT_ERROR"}',
  })

  await t.throwsAsync( async () => {
    await access.removeContent({
      uri: {
        repo: [],
        owner: {},
        path: {}
      },
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":{"repo":"FORMAT_ERROR","owner":"FORMAT_ERROR","path":"FORMAT_ERROR"}}',
  })
})

test('writeAsObject - check params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.writeAsObject({})
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"content":"REQUIRED","uri":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await access.writeAsObject({
      content: 123123123,
      uri: []
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"content":"FORMAT_ERROR","uri":"FORMAT_ERROR"}',
  })
})

test('readAsObject - check  params', async (t) => {
  const { access } = t.context

  await t.throwsAsync( async () => {
    await access.readAsObject({})
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await access.readAsObject({
      uri: []
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"uri":"FORMAT_ERROR"}',
  })
})
