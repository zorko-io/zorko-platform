import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createSpaces} from './createSpaces.mjs'
import {NotFoundError} from '@zorko-io/util-error/lib/index.mjs'
import {Space} from './core'

setupDb(test, async (t) => {
  const {db} = t.context
  t.context.spaces = await createSpaces(db, {log: console})
})

test.serial('iterate on empty and should not fail on second call', async (t) => {
  const {spaces} = t.context
  const owner = 'joe'

  let items = spaces.iterate({owner})

  let result = await items[Symbol.asyncIterator]().next()

  t.true(result.done)

  result = await items[Symbol.asyncIterator]().next()

  t.true(result.done)
})

// test.serial('allocate new spaces and iterate with happy path', async (t) => {
//   const {spaces} = t.context
//
//   const justCreated = []
//
//   // console.log({CHECK: check})
//   //
//   //
//   // for await (let item of items) {
//   //   results.push(item)
//   // }
//   //
//
//
//   const joeSpace = await spaces.allocateSpaceIfNotExists('joe')
//   const bobSpace = await spaces.allocateSpaceIfNotExists('bob')
//
//   items = spaces.iterate({owner})
//
//   hasNext = await items.hasNext()
//
//   t.true(hasNext)
//
//   let space = await items.next()
//
//   t.true(space instanceof Space)
//
//
//   let description = await space.describe()
//
//   t.is(description.name, 'spaces.joe.default')
//   t.is(description.owner, 'joe')
//   t.truthy(description.id)
//
//   hasNext = await items.hasNext()
//
//   t.false(hasNext)
// })

// test.serial('allocate, get and remove - with happy path', async (t) => {
//   const {db} = t.context
//   const spaces = await createSpaces(db, {log : console})
//   const allocatedSpace = await spaces.allocateSpaceIfNotExists('joe')
//
//   t.truthy(allocatedSpace)
//
//   const allocatedSpaceDescription = await allocatedSpace.describe()
//
//   const space = await spaces.get(allocatedSpaceDescription.id)
//   const spaceDescription = await space.describe()
//
//
//   t.deepEqual(spaceDescription, allocatedSpaceDescription)
//
//   await spaces.remove(allocatedSpaceDescription.id)
//
//   await t.throwsAsync(async () => {
//     await spaces.get(allocatedSpaceDescription.id)
//   }, {
//     instanceOf: NotFoundError,
//     message: `Can't find space by #id=${allocatedSpaceDescription.id}`
//   })
//
// })
