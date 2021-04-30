import test from '@zorko-io/tool-test-harness'
import {RepositoryAccessWithValidation} from './RepositoryAccessWithValidation'
import {RepositoryAccess} from '../../core'
import sinon from 'sinon'
import {ResourceAccessError} from '@zorko-io/util-error'

test.beforeEach((t) => {
  const sandbox = sinon.createSandbox()
  const origin = sandbox.createStubInstance(RepositoryAccess)
  const returnResult = 'some-result'

  origin.add.returns(returnResult)
  origin.get.returns(returnResult)
  origin.remove.returns(returnResult)
  origin.iterate.returns(returnResult)

  const repository = new RepositoryAccessWithValidation({
    origin
  })

  t.context = {
    repository,
    origin,
    returnResult,
    sandbox
  }
})

test.afterEach((t)=>{
  t.context.sandbox.restore()
})

test('add - check required params', async (t) => {
  const { repository } = t.context

  await t.throwsAsync( async () => {
    await repository.add({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"content":"REQUIRED","resource":"REQUIRED","folder":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await repository.add({
      content: {},
      resource: {},
      folder: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"resource":{"name":"REQUIRED","mime":"REQUIRED","permission":"REQUIRED"},"folder":{"repo":"REQUIRED","owner":"REQUIRED","path":"REQUIRED"}}',
  })
})

test('add - check proper formats', async (t) => {
  const { repository } = t.context

  await t.throwsAsync( async () => {
    await repository.add({
      content: 'fdfdfdf',
      resource: 'dddddd',
      folder: 'dfdfdffd'
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"content":"FORMAT_ERROR","resource":"FORMAT_ERROR","folder":"FORMAT_ERROR"}',
  })

  await t.throwsAsync( async () => {
    await repository.add({
      content: 1111,
      resource: {
        mime: {},
        name: [],
        permission: [],
        preview: {}
      },
      folder: {
        repo: [],
        owner: {},
        path: {}
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"content":"FORMAT_ERROR","resource":{"name":"FORMAT_ERROR","mime":"FORMAT_ERROR","preview":"FORMAT_ERROR","permission":"FORMAT_ERROR"},"folder":{"repo":"FORMAT_ERROR","owner":"FORMAT_ERROR","path":"FORMAT_ERROR"}}',
  })
})

test('list - check required params', async (t) => {
  const { repository } = t.context

  await t.throws(  () => {
    repository.list({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"folder":"REQUIRED"}',
  })

  await t.throws(() => {
    repository.list({
      folder: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"folder":{"repo":"REQUIRED","owner":"REQUIRED"}}',
  })
})

test('list - check wrong format', async (t) => {
  const { repository } = t.context

  await t.throws(  () => {
    repository.list({
      folder: {
        repo: {},
        owner: [],
        path: {}
      },
      filter: [],
      limit: 'fsdfsdfds',
      offset: 'fsdfsddf',
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"folder":{"repo":"FORMAT_ERROR","owner":"FORMAT_ERROR","path":"FORMAT_ERROR"},"filter":"FORMAT_ERROR","limit":"NOT_POSITIVE_INTEGER","offset":"NOT_POSITIVE_INTEGER"}',
  })
})

test('get - check required and format params', async (t) => {
  const { repository } = t.context

  await t.throwsAsync( async () => {
    await repository.get({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"uri":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await repository.get({uri: {}})
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":{"repo":"REQUIRED","owner":"REQUIRED","path":"REQUIRED"}}',
  })

  await t.throwsAsync( async () => {
    await repository.get({
      uri: {
        repo: [],
        owner: {},
        path: {}
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"uri":{"repo":"FORMAT_ERROR","owner":"FORMAT_ERROR","path":"FORMAT_ERROR"}}',
  })
})

test('remove - check required and format params', async (t) => {
  const { repository } = t.context

  await t.throwsAsync( async () => {
    await repository.remove({})
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await repository.remove({
      uri: {},
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"uri":{"repo":"REQUIRED","owner":"REQUIRED","path":"REQUIRED"}}',
  })

  await t.throwsAsync( async () => {
    await repository.remove({
      uri: {
        repo: [],
        owner: {},
        path: {}
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"uri":{"repo":"FORMAT_ERROR","owner":"FORMAT_ERROR","path":"FORMAT_ERROR"}}',
  })
})
