import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createSpaceRegister} from './createSpaceRegister.mjs'
import {NotFoundError} from '@zorko-io/util-error/lib/index.mjs'

setupDb(test, async (t) => {
  const {db} = t.context
  t.context.spaces = await createSpaceRegister(db, {log: console})
})

test.serial('allocate, get and remove - with happy path', async (t) => {
  const {spaces} = t.context
  const allocatedSpace = await spaces.allocateSpaceIfNotExists('joe')

  t.truthy(allocatedSpace)

  const allocatedSpaceProps = allocatedSpace.properties

  const space = await spaces.get(allocatedSpaceProps.id)
  const spaceProps = space.properties

  t.deepEqual(spaceProps, allocatedSpaceProps)

  await spaces.remove(allocatedSpaceProps.id)

  await t.throwsAsync(async () => {
    await spaces.get(allocatedSpaceProps.id)
  }, {
    instanceOf: NotFoundError,
    message: `Can't find space by #id=${allocatedSpaceProps.id}`
  })

})

test.serial('iterate on empty and should not fail on second call', async (t) => {
  const {spaces} = t.context
  const owner = 'joe'

  let iterable = spaces.iterate({owner})

  let result = await iterable[Symbol.asyncIterator]().next()

  t.true(result.done)

  result = await iterable[Symbol.asyncIterator]().next()

  t.true(result.done)
})

test.serial('allocate new and iterate with happy path', async (t) => {
  const {spaces} = t.context

  t.truthy(spaces)

  const owner = 'joe'
  const justCreated = await spaces.allocateSpaceIfNotExists(owner)
  const iterable = spaces.iterate({owner})

  let results = []

  for await (const space of iterable) {
    results.push(space)
  }

  t.true(results.length === 1)

  let joeSpace = results[0]
  const joeSpaceProperties = joeSpace.properties

  t.deepEqual(joeSpaceProperties, justCreated.properties)
})

test.serial('add new resource with happy path', async (t) => {
  const {spaces} = t.context
  const space = await spaces.allocateSpaceIfNotExists('joe')

  const resource = await space.add({
    path: '/',
    name: 'Bar Char',
    preview: 'url/to/preview/here',
    mime: 'application/json+vega-lite',
    content: {
       spec : {},
    }
  })

  t.truthy(resource)

})

