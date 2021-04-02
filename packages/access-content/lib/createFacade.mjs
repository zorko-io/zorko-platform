import {configDiscovery} from './configDiscovery.mjs'
import {MongoAccessContentFacade} from './mongo'
import {MockLogger} from '@zorko-io/util-logger/lib/types/index.mjs'

const SUPPORTED_DB_TYPES = {
  Mongo: 'mongodb',
}

const DEFAULT_DEPS = {
  log: new MockLogger()
}

/**
 * Create Access Content Facade
 * @param {Object} config - configuration
 * @return {Promise<AccessContentFacade>}
 */

export async function createFacade (config = {}, deps = {}) {

  deps = {
    ...DEFAULT_DEPS,
    ...deps
  }

  if (!config) {
    config = configDiscovery.discover()
  }

  const {dbType} = config
  let facade

  if (dbType === SUPPORTED_DB_TYPES.Mongo) {
    facade = await new Promise((resolve, reject) => {
      new MongoAccessContentFacade({
        ...config,
        onReady: resolve,
        onFailure: reject
      }, deps)
    })
  }

  // wrap with validation, audit and security decorators

  return facade

}