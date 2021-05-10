import {configDiscovery} from './configDiscovery.mjs'
import {MongoAccessContentFacade} from './mongo'
import {MockLogger} from '@zorko-io/util-logger/lib/types/index.mjs'
import {AccessContentFacadeWithValidation} from './validation'

const SUPPORTED_DB_TYPES = {
  Mongo: 'mongodb',
}

const DEFAULT_DEPS = {
  log: new MockLogger(),
}

/**
 * Create Access Content Facade
 * @param {Object} config - configuration
 * @return {Promise<AccessContentFacade>}
 */

export async function createFacade(config = {}, deps = {}) {
  deps = {
    ...DEFAULT_DEPS,
    ...deps,
  }

  if (!config) {
    config = configDiscovery.discover()
  }

  const {dbType} = config
  let facade


  try {
    if (dbType === SUPPORTED_DB_TYPES.Mongo) {
      facade = await new Promise((resolve, reject) => {
        new MongoAccessContentFacade(
          {
            ...config,
            onReady: resolve,
            onFailure: reject,
          },
          deps
        )
      })
    }

    return new AccessContentFacadeWithValidation({origin: facade})
  } catch (error) {
    // TODO: 'access-content' use logger from deps
    console.error(error)
  }
}
