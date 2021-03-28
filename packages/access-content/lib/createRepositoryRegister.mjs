import {configDiscovery} from './configDiscovery'
import {MockLogger} from '@zorko-io/util-logger'
import mongo from 'mongodb'
import {MongoRegisterAccess} from './mongo'
import {ApplicationError, ResourceAccessError} from '@zorko-io/util-error'
import {createRepositoryAccess} from './createRepositoryAccess'
import {createContentAccess} from './createContentAccess'
import {createContent} from './createContent'
import {createResourceAccess} from './createResourceAccess'

const DEFAULT_DEPS = {
  log: new MockLogger(),
  createRepositoryAccess,
  createResourceAccess,
  createContentAccess,
  createContent
}

/**
 * Create Content Repository Register
 * @param {Object} config
 * @param {Object} deps
 * @return {Promise<RegisterAccess>}
 */

export async function createRepositoryRegister(config, deps = {}) {
  deps = {
    ...deps,
    ...DEFAULT_DEPS
  }

  if (!config) {
    config = configDiscovery.discover()
  }

  const {dbType, uri} = config
  const {log} = deps
  let register = null

  if (dbType === 'mongodb') {

    let client

    try {
      client = new mongo.MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })

      await client.connect()

      let db = client.db()

      try {
        await db.createCollection(MongoRegisterAccess.name, {
          validator: {
            $jsonSchema: MongoRegisterAccess.schema
          }
        })
      } catch (error) {

        if (error.codeName === 'NamespaceExists') {
          log.info(`Collection #name=${MongoRegisterAccess.name} was already created, skipping...`)
        } else {
          throw new ResourceAccessError(error.message)
        }
      }

      register = new MongoRegisterAccess({}, {
        ...deps,
        db
      })


    } catch (error) {
      // TODO: throw ResourceAccess error
      if (client) {
        await client.close()
      }
      if (!(error instanceof ApplicationError)) {
        throw new ResourceAccessError(error.message)
      }
    }
  }

  return register
}