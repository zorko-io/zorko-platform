import test from '@zorko-io/tool-test-harness'
import {createConfigDiscovery} from './createConfigDiscovery'
import structure from '../config.json'
import validation from '../config-schema.json'
import path from 'path'
import someOtherStructure from '../someconfigs/config.json'
import someOtherValidation from '../someconfigs/config-schema.json'
import {ConfmeConfigDiscovery} from './confme/index.mjs'

test('async - parses valid value', async (t) => {
  const discovery = createConfigDiscovery()

  t.true(discovery instanceof ConfmeConfigDiscovery)
  t.deepEqual(discovery.schema.structure, structure)
  t.deepEqual(discovery.schema.validation,validation )
})

test('async - parses with specific folder', async (t) => {
  const discovery = createConfigDiscovery({
    dir: path.resolve() + "/someconfigs"
  })

  t.true(discovery instanceof ConfmeConfigDiscovery)
  t.deepEqual(discovery.schema.structure, someOtherStructure)
  t.deepEqual(discovery.schema.validation,someOtherValidation )
})