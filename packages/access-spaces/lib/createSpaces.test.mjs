import test from '@zorko-io/tool-test-harness'
import {createSpaces} from './createSpaces.mjs'

test('async - parses valid value', async (t) => {
  const spaces = createSpaces()

  console.log({spaces})

  t.truthy(spaces)
})
