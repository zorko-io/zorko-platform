import test from '@zorko-io/tool-test-harness'
import {createConfigDiscovery} from './createConfigDiscovery'
import structure from '../config.json'
import validation from '../config-schema.json'
import someOtherStructure from '../someconfigs/config.json'
import someOtherValidation from '../someconfigs/config-schema.json'
import {ConfmeConfigDiscovery} from './confme'
import {fromUrlToDirPath} from './fromUrlToDirPath'

test('async - parses valid value', async (t) => {
  const discovery = createConfigDiscovery()

  t.true(discovery instanceof ConfmeConfigDiscovery)
  t.deepEqual(discovery.schema.structure, structure)
  t.deepEqual(discovery.schema.validation, validation)
})

test('async - parses with specific folder', async (t) => {
  const discovery = createConfigDiscovery({
    dir: fromUrlToDirPath(import.meta.url, '../someconfigs'),
  })

  t.true(discovery instanceof ConfmeConfigDiscovery)
  t.deepEqual(discovery.schema.structure, someOtherStructure)
  t.deepEqual(discovery.schema.validation, someOtherValidation)
})
