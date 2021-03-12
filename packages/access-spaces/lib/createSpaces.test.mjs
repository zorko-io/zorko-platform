import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createSpaces} from './createSpaces.mjs'
import {NotFoundError} from '@zorko-io/util-error/lib/index.mjs'
import {Space} from './core'

setupDb(test)

test.serial('allocate new and iterate with happy path', async (t) => {
  const {db} = t.context
  const spaces = await createSpaces(db, {log : console})

  t.truthy(spaces)

  const owner = 'joe'

  let cursor = spaces.iterate({owner})

  let hasNext = await cursor.hasNext()

  t.false(hasNext)

  await spaces.allocateSpaceIfNotExists('joe')

  cursor = spaces.iterate({owner})

  hasNext = await cursor.hasNext()

  t.true(hasNext)

  let space = await cursor.next()

  t.true(space instanceof Space)


  let description = await space.describe()

  t.is(description.name, 'spaces.joe.default')
  t.is(description.owner, 'joe')
  t.truthy(description.id)

  hasNext = await cursor.hasNext()

  t.false(hasNext)
})

test.serial('allocate, get and remove - with happy path', async (t) => {
  const {db} = t.context
  const spaces = await createSpaces(db, {log : console})
  const allocatedSpace = await spaces.allocateSpaceIfNotExists('joe')

  t.truthy(allocatedSpace)

  const allocatedSpaceDescription = await allocatedSpace.describe()

  const space = await spaces.get(allocatedSpaceDescription.id)
  const spaceDescription = await space.describe()


  t.deepEqual(spaceDescription, allocatedSpaceDescription)

  await spaces.remove(allocatedSpaceDescription.id)

  await t.throwsAsync(async () => {
    await spaces.get(allocatedSpaceDescription.id)
  }, {
    instanceOf: NotFoundError,
    message: `Can't find space by #id=${allocatedSpaceDescription.id}`
  })

})
