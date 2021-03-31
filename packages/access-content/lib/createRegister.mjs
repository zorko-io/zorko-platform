import {configDiscovery} from './configDiscovery'
import {MockLogger} from '@zorko-io/util-logger'
import mongo from 'mongodb'
import {MongoRegisterAccess} from './mongo'
import {ApplicationError, ResourceAccessError} from '@zorko-io/util-error'
import {createRepositoryAccess} from './createRepositoryAccess'
import {createContentAccess} from './createContentAccess'
import {createContent} from './createContent'
import {createResourceAccess} from './createResourceAccess'
import {AuditRegisterAccess} from './audit'

const DEFAULT_DEPS = {
  log: new MockLogger(),
  createRepositoryAccess,
  createResourceAccess,
  createContentAccess,
  createContent,
}

const SUPPORTED_DB_TYPES = {
  Mongo: 'mongodb',
}

/**
 * Create Content Repository Register
 * @param {Object} config
 * @param {Object} deps
 * @return {Promise<RegisterAccess>}
 */

export async function createRegister(config, deps = {}) {
  deps = {
    ...deps,
    ...DEFAULT_DEPS,
  }

  if (!config) {
    config = configDiscovery.discover()
  }

  const {dbType, uri} = config
  const {log} = deps
  let register = null

  if (dbType === SUPPORTED_DB_TYPES.Mongo) {
    let client

    try {
      client = new mongo.MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })

      await client.connect()

      let db = client.db()

      await MongoRegisterAccess.createSchema({
        db,
        log
      })

      register = new MongoRegisterAccess(
        {},
        {
          ...deps,
          db,
        }
      )
    } catch (error) {
      if (client) {
        await client.close()
      }
      if (!(error instanceof ApplicationError)) {
        throw new ResourceAccessError(error.message)
      }
    }
  } else {
    let supportedTypes = Object.values(SUPPORTED_DB_TYPES).join(',')
    throw new ResourceAccessError(`Not supported DB type, allowed ${supportedTypes}`)
  }

  return new AuditRegisterAccess({origin: register}, deps)
}
