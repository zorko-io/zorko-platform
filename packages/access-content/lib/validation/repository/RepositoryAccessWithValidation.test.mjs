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
    message:  'ValidationError: {"content":"REQUIRED","resource":"REQUIRED","repository":"REQUIRED"}'
  })

  await t.throwsAsync( async () => {
    await repository.add({
      content: {},
      resource: {},
      repository: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"resource":{"parent":"REQUIRED","name":"REQUIRED","mime":"REQUIRED","permission":"REQUIRED"},"repository":{"name":"REQUIRED","owner":"REQUIRED"}}',
  })
})

test('add - check proper formats', async (t) => {
  const { repository } = t.context

  await t.throwsAsync( async () => {
    await repository.add({
      content: 'fdfdfdf',
      resource: 'dddddd',
      repository: 'dfdfdffd'
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"content":"FORMAT_ERROR","resource":"FORMAT_ERROR","repository":"FORMAT_ERROR"}',
  })

  await t.throwsAsync( async () => {
    await repository.add({
      content: 1111,
      resource: {
        parent: {},
        mime: {},
        name: [],
        permission: [],
        preview: {}
      },
      repository: {
        name: [],
        owner: {},
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"content":"FORMAT_ERROR","resource":{"parent":"FORMAT_ERROR","name":"FORMAT_ERROR","mime":"FORMAT_ERROR","preview":"FORMAT_ERROR","permission":"FORMAT_ERROR"},"repository":{"name":"FORMAT_ERROR","owner":"FORMAT_ERROR"}}'
  })
})

test('iterate - check required params', async (t) => {
  const { repository } = t.context

  await t.throws(  () => {
    repository.iterate({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"repository":"REQUIRED"}'
  })

  await t.throws(() => {
    repository.iterate({
      repository: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:   'ValidationError: {"repository":{"name":"REQUIRED","owner":"REQUIRED"}}',
  })
})

test('iterate - check wrong format', async (t) => {
  const { repository } = t.context

  await t.throws(  () => {
    repository.iterate({
      repository: {
        name: {},
        owner: []
      },
      query: {
        select: 1232131,
        filter: 10000,
        limit: 'fsdfsdfds',
        offset: 'fsdfsddf'
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"query":{"select":"FORMAT_ERROR","filter":"FORMAT_ERROR","limit":"NOT_POSITIVE_INTEGER","offset":"NOT_POSITIVE_INTEGER"},"repository":{"name":"FORMAT_ERROR","owner":"FORMAT_ERROR"}}'
  })
})

test('get - check required and format params', async (t) => {
  const { repository } = t.context

  await t.throwsAsync( async () => {
    await repository.get({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"resource":"REQUIRED","repository":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await repository.get({
      repository: {},
      resource: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"resource":{"id":"REQUIRED"},"repository":{"name":"REQUIRED","owner":"REQUIRED"}}',
  })

  await t.throwsAsync( async () => {
    await repository.get({
      resource: {
        id: []
      },
      repository: {
        name: [],
        owner: {}
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"resource":{"id":"FORMAT_ERROR"},"repository":{"name":"FORMAT_ERROR","owner":"FORMAT_ERROR"}}',
  })
})

test('remove - check required and format params', async (t) => {
  const { repository } = t.context

  await t.throwsAsync( async () => {
    await repository.remove({})
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"resource":"REQUIRED","repository":"REQUIRED"}',
  })

  await t.throwsAsync( async () => {
    await repository.remove({
      repository: {},
      resource: {}
    })
  }, {
    instanceOf: ResourceAccessError,
    message:  'ValidationError: {"resource":{"id":"REQUIRED"},"repository":{"name":"REQUIRED","owner":"REQUIRED"}}',
  })

  await t.throwsAsync( async () => {
    await repository.remove({
      resource: {
        id: []
      },
      repository: {
        name: [],
        owner: {}
      }
    })
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: {"resource":{"id":"FORMAT_ERROR"},"repository":{"name":"FORMAT_ERROR","owner":"FORMAT_ERROR"}}',
  })
})
