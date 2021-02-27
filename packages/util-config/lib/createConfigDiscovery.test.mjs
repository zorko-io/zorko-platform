import test from '@zorko-io/tool-test-harness'
import {createConfigDiscovery} from './createConfigDiscovery'
import structure from '../config.json'
import mapping from '../config-schema.json'

test('async - parses valid value', async (t) => {
  const discovery = createConfigDiscovery()

  t.deepEqual(discovery.schema.structure, structure)
  // t.deepEqual(discovery.schema.validation,mapping )
})