import test from '@zorko-io/tool-test-harness'
import {RepositoryFixture, setupDb, VegaSpecFixture} from './helper'
import {createFacade, MimeTypes, PermissionDefaults} from '../lib'
import {toObjectId} from '../lib/mongo/util'
import {NotFoundError} from '@zorko-io/util-error'
import * as path from 'path'
import {toArray} from '@zorko-io/util-lang/lib/index.mjs'

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

const writeResources = async ({repository, path, resources} = {}) => {
  let results = []

  for (let resource of resources) {
    results.push(await repository.add({
      path: path,
      resource: resource,
      content: resource.content
    }))
  }
  return results
}

function cleanUpBeforeCompare(arr) {
  return arr.map(i => {
    delete i.id
    delete i.content
    delete i.path
    return i
  })
}

test.serial('add - new resource with happy path', async (t) => {
  const {
    repository,
  } = t.context

  const spec = VegaSpecFixture.getBarChart()
  let path = RepositoryFixture.getRepoPath()
  let resource = RepositoryFixture.getSomeResource()

  const actual = await repository.add({
    resource: resource,
    content: { spec }, // TODO: just pass spec
    path: path
  })

  t.truthy(actual)
  t.truthy(actual.id)

  t.deepEqual(actual.name, resource.name, 'should match #name')
  t.deepEqual(actual.parent, '/', 'should match  #parent')
  t.deepEqual(actual.path, '/Bar Char', 'should match  #path')
  t.deepEqual(actual.mime, resource.mime, 'should match  #mime')
  t.deepEqual(actual.preview, resource.preview, 'should match #preview')
  t.deepEqual(actual.permission, resource.permission, 'should match #permission')

  t.true(typeof actual.content == 'string')
})

// test.serial('get resource - happy path', async (t) => {
//   const {
//     repository,
//     defaultBarChartResource,
//     defaultBarChartContent,
//     defaultJoeRepository
//   } = t.context
//
//   const {id} = await repository.add({
//     resource: defaultBarChartResource,
//     content: defaultBarChartContent,
//     repository: defaultJoeRepository
//   })
//
//   const actual = await repository.get({
//     resource: {
//       id
//     },
//     repository: defaultJoeRepository
//   })
//
//   t.truthy(actual)
//   t.truthy(actual.id)
//
//   t.deepEqual(actual.name, defaultBarChartResource.name, 'should match #name')
//   t.deepEqual(actual.path, '/Bar Char', 'should match  #path')
//   t.deepEqual(actual.mime, defaultBarChartResource.mime, 'should match  #mime')
//   t.deepEqual(actual.preview, defaultBarChartResource.preview, 'should match #preview')
//   t.deepEqual(actual.permission, defaultBarChartResource.permission, 'should match #permission')
//
//   t.true(typeof actual.content == 'string')
// })
//
// test.serial('fails with not found', async (t) => {
//   const {repository, defaultJoeRepository} = t.context
//   let id = toObjectId().toString()
//
//   await t.throwsAsync(async () => {
//     await repository.get({
//       repository: defaultJoeRepository,
//       resource: {
//         id
//       }
//     })
//   }, {
//     instanceOf: NotFoundError,
//     message: `Can't find resource with #id=${id}, #repo=default, #owner=joe`
//   })
// })
//
// test.serial('add, get and remove one item', async (t) => {
//   const {
//     repository,
//     defaultJoeRepository,
//     defaultBarChartResource,
//     defaultBarChartContent
//   } = t.context
//
//   const newResource = await repository.add({
//     resource: defaultBarChartResource,
//     content: defaultBarChartContent,
//     repository: defaultJoeRepository
//   })
//
//   let actual = await repository.get({
//     repository: defaultJoeRepository,
//     resource: {
//       id: newResource.id
//     }
//   })
//
//   t.deepEqual(newResource, actual)
//
//   await repository.remove({
//     resource: {
//       id: newResource.id
//     },
//     repository: defaultJoeRepository
//   })
//
//   await t.throwsAsync(async () => {
//     await repository.get({
//       repository: defaultJoeRepository,
//       resource: {
//         id: newResource.id
//       }
//     })
//   }, {
//     instanceOf: NotFoundError
//   })
//
// })
//
// test.serial('query fee items', async (t) => {
//   const {repository} = t.context
//
//   const defaultJoeRepoPath = RepositoryDataHelper.getRepoPath()
//   const resources = await RepositoryDataHelper.getVariousResources()
//
//   for (let resource of resources) {
//     await repository.add({
//       repository: {
//         name: defaultJoeRepoPath.repo,
//         owner: defaultJoeRepoPath.owner
//       },
//       resource: resource,
//       content: resource.content
//     })
//   }
//
//   const items = repository.list({
//     path: defaultJoeRepoPath,
//   })
//
//   t.truthy(items)
//
//   let count = 0
//
//   for await (let item of items) {
//     let expectedResource = resources[count]
//
//     t.truthy(item)
//     t.true(typeof item.id === 'string')
//     t.truthy(item.id)
//
//     t.true(typeof item.content === 'string')
//     t.truthy(item.id)
//
//     t.is(item.path, path.join(expectedResource.parent, expectedResource.name))
//
//     delete item.id
//     delete item.content
//     delete item.path
//     delete expectedResource.content
//
//     t.deepEqual(item, expectedResource)
//     count = count + 1
//   }
//
//   t.true(count === resources.length)
// })
//
// test.serial('query limit and offset', async (t) => {
//   const {repository} = t.context
//
//   const defaultJoeRepository = RepositoryDataHelper.getRepoPath()
//   let resources = await RepositoryDataHelper.getVariousResources()
//
//   await writeResources({
//     repository,
//     resources,
//     location: defaultJoeRepository
//   })
//
//   let it = repository.list({
//     limit: 2,
//     path: defaultJoeRepository
//   })
//
//
//   let actual = await toArray(it)
//
//   function cleanUpBeforeCompare(arr) {
//     return arr.map(i => {
//       delete i.id
//       delete i.content
//       delete i.path
//       return i
//     })
//   }
//
//   actual = cleanUpBeforeCompare(actual)
//   resources = cleanUpBeforeCompare(resources)
//
//   t.is(actual.length, 2)
//   t.deepEqual(actual, [resources[0], resources[1]])
//
//
//   it = repository.list({
//     path: defaultJoeRepository,
//     limit: 2,
//     offset: 2,
//   })
//
//   actual = await toArray(it)
//
//   t.is(actual.length, 2)
//   t.deepEqual(cleanUpBeforeCompare(actual), [resources[2], resources[3]])
// })
//
// test.serial('query with filter', async (t ) => {
//   const {repository} = t.context
//
//   const defaultJoeRepository = RepositoryDataHelper.getRepoPath()
//   let resources = await RepositoryDataHelper.getVariousResources()
//
//    await writeResources({
//     repository,
//     resources,
//     location: defaultJoeRepository
//   })
//
//   let results = repository.list({
//     path: defaultJoeRepository,
//     filter: {
//       mime:MimeTypes.VegaLiteTheme
//     },
//   })
//
//   results = await toArray(results)
//
//   t.is(results.length, 1)
//
//
//   t.deepEqual(cleanUpBeforeCompare([results[0]]), cleanUpBeforeCompare([resources.pop()]))
// })
//
// test.serial('query with total', async (t ) => {
//   const {repository} = t.context
//
//   const defaultJoeRepository = RepositoryDataHelper.getRepoPath()
//   let resources = await RepositoryDataHelper.getVariousResources()
//
//   await writeResources({
//     repository,
//     resources,
//     location: defaultJoeRepository
//   })
//
//   const results = repository.list({
//     path: defaultJoeRepository,
//     filter: {
//       mime: MimeTypes.VegaLite
//     },
//   })
//
//   const total = await results.total()
//
//   t.is(total, 4)
//
// })
//
//
