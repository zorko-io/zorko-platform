import test from '@zorko-io/tool-test-harness'
import {RepositoryFixture, setupDb, VegaSpecFixture} from './helper'
import {createFacade, MimeTypes} from '../lib'
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

const writeResources = async ({folder, resources, repository} = {}) => {
  let results = []

  for (let resource of resources) {
    results.push(await repository.add({
      folder: folder,
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
    repository
  } = t.context

  const spec = VegaSpecFixture.getBarChart()
  let folder = RepositoryFixture.getResourceFolderUri()
  let resource = RepositoryFixture.getSomeResource()

  const actual = await repository.add({
    resource: resource,
    content: spec,
    folder: folder
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

test.serial('get resource - happy path', async (t) => {
  const {
    repository
  } = t.context

  const spec = VegaSpecFixture.getBarChart()
  let folder = RepositoryFixture.getResourceFolderUri()
  let resource = RepositoryFixture.getSomeResource()

  await repository.add({
    resource: resource,
    content: spec,
    folder: folder
  })

  const actual = await repository.get({
    uri: RepositoryFixture.getResourceUri()
  })

  t.truthy(actual)
  t.truthy(actual.id)

  t.deepEqual(actual.name, resource.name, 'should match #name')
  t.deepEqual(actual.path, '/Bar Char', 'should match  #path')
  t.deepEqual(actual.mime, resource.mime, 'should match  #mime')
  t.deepEqual(actual.preview, resource.preview, 'should match #preview')
  t.deepEqual(actual.permission, resource.permission, 'should match #permission')

  t.true(typeof actual.content == 'string')
})

test.serial('fails with not found', async (t) => {
  const {repository} = t.context

  await t.throwsAsync(async () => {
    await repository.get({uri: RepositoryFixture.getResourceUri()})
  }, {
    instanceOf: NotFoundError,
    message: 'Can\'t find resource with #uri=joe/default/Bar Char'
  })
})

test.serial('add, get and remove one item', async (t) => {
  const {
    repository
  } = t.context

  const spec = VegaSpecFixture.getBarChart()
  let folder = RepositoryFixture.getResourceFolderUri()
  let resource = RepositoryFixture.getSomeResource()

  const newResource = await repository.add({
    resource,
    content: spec,
    folder
  })

  let newResourceUri = RepositoryFixture.getResourceUri(newResource.path)
  let actual = await repository.get({
    uri: newResourceUri
  })

  t.deepEqual(newResource, actual)

  await repository.remove({
    uri: newResourceUri
  })

  await t.throwsAsync(async () => {
    await repository.get({uri: newResourceUri})
  }, {
    instanceOf: NotFoundError
  })

})

test.serial('query fee items', async (t) => {
  const {repository} = t.context

  const rootFolderUri = RepositoryFixture.getResourceFolderUri()
  const resources = await RepositoryFixture.getVariousResources()

  for (let resource of resources) {
    await repository.add({
      folder: rootFolderUri,
      resource: resource,
      content: resource.content
    })
  }

  const items = repository.list({
    folder: rootFolderUri
  })

  t.truthy(items)

  let count = 0

  for await (let item of items) {
    let expectedResource = resources[count]

    t.truthy(item)
    t.true(typeof item.id === 'string')
    t.truthy(item.id)

    t.true(typeof item.content === 'string')
    t.truthy(item.id)

    t.is(item.path, path.join(expectedResource.parent, expectedResource.name))

    delete item.id
    delete item.content
    delete item.path
    delete expectedResource.content

    t.deepEqual(item, expectedResource)
    count = count + 1
  }

  t.true(count === resources.length)
})

test.serial('query limit and offset', async (t) => {
  const {repository} = t.context

  const rootFolderUri = RepositoryFixture.getResourceFolderUri()
  let resources = await RepositoryFixture.getVariousResources()

  await writeResources({
    folder: rootFolderUri,
    resources,
    repository
  })

  let it = repository.list({
    limit: 2,
    folder: rootFolderUri
  })


  let actual = await toArray(it)

  function cleanUpBeforeCompare(arr) {
    return arr.map(i => {
      delete i.id
      delete i.content
      delete i.path
      return i
    })
  }

  actual = cleanUpBeforeCompare(actual)
  resources = cleanUpBeforeCompare(resources)

  t.is(actual.length, 2)
  t.deepEqual(actual, [resources[0], resources[1]])


  it = repository.list({
    folder: rootFolderUri,
    limit: 2,
    offset: 2
  })

  actual = await toArray(it)

  t.is(actual.length, 2)
  t.deepEqual(cleanUpBeforeCompare(actual), [resources[2], resources[3]])
})

test.serial('query with filter', async (t) => {
  const {repository} = t.context

  const rootFolder = RepositoryFixture.getResourceFolderUri()
  let resources = await RepositoryFixture.getVariousResources()

  await writeResources({
    repository,
    resources,
    folder: rootFolder
  })

  let results = repository.list({
    folder: rootFolder,
    filter: {
      mime: MimeTypes.VegaLiteTheme
    }
  })

  results = await toArray(results)

  t.is(results.length, 1)
  t.deepEqual(cleanUpBeforeCompare([results[0]]), cleanUpBeforeCompare([resources.pop()]))
})

test.serial('query with total', async (t) => {
  const {repository} = t.context

  const rootFolder = RepositoryFixture.getResourceFolderUri()
  let resources = await RepositoryFixture.getVariousResources()

  await writeResources({
    repository,
    resources,
    folder: rootFolder
  })

  const results = repository.list({
    folder: rootFolder,
    filter: {
      mime: MimeTypes.VegaLite
    }
  })

  const total = await results.total()

  t.is(total, 4)
})

test.serial('read content as an object', async (t) => {
  const {
    repository
  } = t.context

  let folder = RepositoryFixture.getResourceFolderUri()
  const spec = VegaSpecFixture.getBarChart()
  let resource = RepositoryFixture.getSomeResource()

  await repository.add({
    resource,
    content: spec,
    folder
  })


  let uri = {
    ...folder,
    path: path.join(folder.path, resource.name)
  }

  const content = await repository.read({
    uri: uri
  })

  t.deepEqual(content, spec)

})


