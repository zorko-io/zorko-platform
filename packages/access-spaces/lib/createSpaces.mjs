import {configDiscovery} from './configDiscovery'
import createKnex from 'knex'
import {MockLogger} from '@zorko-io/util-logger'
import {KnexLogger} from './knex'

export function createSpaces (config, deps = {log : new MockLogger()}) {
  if (!config) {
    config = configDiscovery.discover()
  }

  const {log} = deps

  const knex = createKnex({
    client: config.spaces.dbType,
    connection: {
      filename: config.spaces.file
    },
    log: new KnexLogger(log)
  });

  console.log({knex})

  return {}
}