import test from '@zorko-io/tool-test-harness'
import {RepositoryFixture, setupDb, VegaSpecFixture} from './helper/index.mjs'
import {createFacade, PermissionDefaults} from '../lib/index.mjs'
import {NotFoundError, AlreadyExistsError} from '@zorko-io/util-error'

setupDb(test, async (t) => {
  const {db} = t.context
  try {
    let facade = await createFacade(db)
    t.context.facade = facade
    t.context.register = facade.register
    t.context.content = facade.content
  } catch (err) {
    console.error(`Can't create access content facade`, err)
    throw err
  }
})

test.serial('write and read content', async (t) => {
  const uri = RepositoryFixture.getResourceUri()
  const spec = VegaSpecFixture.getBarChart()
  const permission = PermissionDefaults.Public

  const { content } = t.context

  await content.writeAsObject({
    content: spec,
    permission,
    uri
  })

  const actual = await content.readAsObject({
    uri
  })

  t.deepEqual(spec, actual)
})

test.serial('readAsObject - fails with not found', async (t) => {
  const {content} = t.context
  const uri = RepositoryFixture.getResourceUri('/NoSuchResource')

  await t.throwsAsync(async () => {
    await content.readAsObject({
      uri
    })
  }, {
    instanceOf: NotFoundError,
    message: 'Can\'t find content with #uri=joe/default/NoSuchResource'
  })
})

test.serial('writeAsObject - can not write twice with the same path', async (t) => {
  const {content, register} = t.context
  const uri = RepositoryFixture.getResourceUri()
  const spec = VegaSpecFixture.getBarChart()

  // we have to register repository first
  await register.allocateNewRepo(uri)

  await content.writeAsObject({
    uri,
    content: spec
  })

  await t.throwsAsync(async () => {
    await content.writeAsObject({
      uri,
      content: spec
    })
  }, {
    instanceOf: AlreadyExistsError,
    message: 'Content with #uri=joe/default/Bar Char was already created'
  })
})

test.serial('removeContent - read content metadata', async (t) => {
  const {content } = t.context
  const uri = RepositoryFixture.getResourceUri()
  const spec = VegaSpecFixture.getBarChart()

  await content.writeAsObject({
    uri,
    content: spec
  })

  await content.removeContent({
    uri
  })

  await t.throwsAsync(async () => {
    await content.readAsObject({
      uri
    })
  }, {
    instanceOf: NotFoundError,
    message: 'Can\'t find content with #uri=joe/default/Bar Char'
  })
})