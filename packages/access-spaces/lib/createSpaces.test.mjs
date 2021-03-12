import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createSpaces} from './createSpaces.mjs'
import {Space} from './core'

setupDb(test)

test('async - parses valid value', async (t) => {
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
