import test from '@zorko-io/tool-test-harness'
import {RepositoryDataHelper, setupDb} from './helper'
import {createFacade, PermissionDefaults} from '../lib'
import {toObjectId} from '../lib/mongo/util'
import {NotFoundError} from '@zorko-io/util-error'

setupDb(test, async (t) => {
  const {db} = t.context
  try {
    const facade = await createFacade(db)
    t.context.facade = facade
    t.context.repository = facade.repository
  } catch (err) {
    console.error(`Can't create repo register`, err)
    throw err
  }
})

test.beforeEach((t) => {
  t.context.defaultBarChartResource = {
    parent: '/',
    name: 'Bar Char',
    preview: 'url/to/preview/here',
    mime: 'application/json+vega-lite',
    permission: PermissionDefaults.Public
  }
  t.context.defaultBarChartContent = {
    spec: {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'A simple bar chart with embedded data.',
      data: {
        values: [
          {a: 'A', b: 28},
          {a: 'B', b: 55},
          {a: 'C', b: 43},
          {a: 'D', b: 91},
          {a: 'E', b: 81},
          {a: 'F', b: 53},
          {a: 'G', b: 19},
          {a: 'H', b: 87},
          {a: 'I', b: 52},
        ],
      },
      mark: 'bar',
      encoding: {
        x: {field: 'a', type: 'nominal', axis: {labelAngle: 0}},
        y: {field: 'b', type: 'quantitative'},
      },
    },
  }
  t.context.defaultJoeRepository = {
    name : 'default',
    owner: 'joe'
  }
})

test.serial('add - new resource with happy path', async (t) => {
  const {repository,
    defaultBarChartResource,
    defaultBarChartContent,
    defaultJoeRepository
  } = t.context

  const actual = await repository.add({
    resource: defaultBarChartResource,
    content: defaultBarChartContent,
    repository: defaultJoeRepository
  })

  t.truthy(actual)
  t.truthy(actual.id)

  t.deepEqual(actual.name, defaultBarChartResource.name, 'should match #name')
  t.deepEqual(actual.parent, defaultBarChartResource.parent, 'should match  #parent')
  t.deepEqual(actual.path, '/Bar Char', 'should match  #path')
  t.deepEqual(actual.mime, defaultBarChartResource.mime, 'should match  #mime')
  t.deepEqual(actual.preview, defaultBarChartResource.preview, 'should match #preview')
  t.deepEqual(actual.permission, defaultBarChartResource.permission, 'should match #permission')

  t.true(typeof actual.content == 'string')
})

test.serial('get resource - happy path', async (t) => {
  const {repository,
    defaultBarChartResource,
    defaultBarChartContent,
    defaultJoeRepository
  } = t.context

 const { id } = await repository.add({
    resource: defaultBarChartResource,
    content: defaultBarChartContent,
    repository: defaultJoeRepository
  })

  const actual = await repository.get({
    resource: {
      id
    },
    repository: defaultJoeRepository
  })

  t.truthy(actual)
  t.truthy(actual.id)

  t.deepEqual(actual.name, defaultBarChartResource.name, 'should match #name')
  t.deepEqual(actual.path, '/Bar Char', 'should match  #path')
  t.deepEqual(actual.mime, defaultBarChartResource.mime, 'should match  #mime')
  t.deepEqual(actual.preview, defaultBarChartResource.preview, 'should match #preview')
  t.deepEqual(actual.permission, defaultBarChartResource.permission, 'should match #permission')

  t.true(typeof actual.content == 'string')
})

test.serial('fails with not found', async (t) => {
  const {repository, defaultJoeRepository} = t.context
  let id = toObjectId().toString()

  await t.throwsAsync(async () => {
    await repository.get({
      repository: defaultJoeRepository,
      resource:{
        id
      }
    })
  }, {
    instanceOf: NotFoundError,
    message: `Can't find resource with #id=${id}, #repo=default, #owner=joe`
  })
})

test.serial('add, get and remove one item', async (t) => {
  const {
    repository,
    defaultJoeRepository,
    defaultBarChartResource,
    defaultBarChartContent
  } = t.context

  const newResource = await repository.add({
    resource: defaultBarChartResource,
    content: defaultBarChartContent,
    repository: defaultJoeRepository
  })

  let actual = await repository.get({
    repository: defaultJoeRepository,
    resource: {
      id: newResource.id
    }
  })

  t.deepEqual(newResource, actual)

  await repository.remove({
    resource:{
      id: newResource.id,
    },
    repository: defaultJoeRepository
  })

  await t.throwsAsync(async () => {
    await repository.get({
      repository: defaultJoeRepository,
      resource: {
        id: newResource.id
      }
    })
  }, {
    instanceOf: NotFoundError
  })

})

// test.serial('query fee items', async (t) => {
//   const {repository, defaultJoeRepository} = t.context
//
//   const resources = await RepositoryDataHelper.getVariousResources()
//
//   for (let resource of resources) {
//     await repository.add({
//       repository: defaultJoeRepository,
//       resource: resource,
//       content: resource.content,
//     })
//   }
//
//   const items = repository.list({
//     repository: defaultJoeRepository
//   })
//
//   t.truthy(items)
//
//   let result = await items[Symbol.asyncIterator]().next()
//
//   let value = result.value
//
//   t.truthy(value.id)
//   t.falsy(result.done)
//
//   delete value.id
//
//   t.deepEqual(result.value, contentForFewSpecs[0])
//
//   result = await items[Symbol.asyncIterator]().next()
//
//   value = result.value
//
//   t.truthy(value.id)
//   t.falsy(result.done)
//
//   delete value.id
//   t.deepEqual(result.value, contentForFewSpecs[1])
//
//
//   result = await items[Symbol.asyncIterator]().next()
//
//   t.falsy(result.value)
//   t.truthy(result.done)
// })


