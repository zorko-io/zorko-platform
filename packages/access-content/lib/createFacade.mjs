import {configDiscovery} from './configDiscovery.mjs'
import {MongoAccessContentFacade} from './mongo'

const SUPPORTED_DB_TYPES = {
  Mongo: 'mongodb',
}

/**
 * Create Access Content Facade
 * @param {Object} config - configuration
 * @return {Promise<AccessContentFacade>}
 */

export async function createFacade (config = {}, deps = {}) {

  if (!config) {
    config = configDiscovery.discover()
  }

  const {dbType} = config
  let facade

  if (dbType === SUPPORTED_DB_TYPES.Mongo) {
    facade = new MongoAccessContentFacade({
      ...config
    }, deps)
  }

  return facade

}