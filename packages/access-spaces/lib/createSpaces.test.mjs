import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
// import {createSpaces} from './createSpaces.mjs'

setupDb(test)

test('async - parses valid value', async (t) => {
  // const spaces = createSpaces()
  // const spaces = {}

  const {uri} = t.context.db

  console.log({uri})

  t.truthy(uri)

})
