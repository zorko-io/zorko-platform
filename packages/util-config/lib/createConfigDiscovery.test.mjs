import test from '@zorko-io/tool-test-harness'
import {createConfigDiscovery} from './createConfigDiscovery'

test('async - parses valid value', async (t) => {
  const discovery = createConfigDiscovery()

  console.log({discovery})

  t.deepEqual(discovery.schema.structure, {})
})