import {configDiscovery} from './configDiscovery'
import createKnex from 'knex'
import {MockLogger} from '@zorko-io/util-logger'
import {KnexLogger} from './knex'
import mongo from 'mongodb'
import {MongoSpaces} from './mongo/MongoSpaces'

export async function createSpaces (config, deps = {log : new MockLogger()}) {
  if (!config) {
    config = configDiscovery.discover()
  }

  const {log} = deps
  const {dbType, uri} = config
  let spaces = null

  if (dbType === 'mongodb') {

    let client

    try{
      client = new  mongo.MongoClient(uri, {
        useUnifiedTopology:true,
        useNewUrlParser: true
      })

      await client.connect()

      let db = client.db()

      spaces = new MongoSpaces({}, {
        db,
        log
      })

      return spaces

    } catch (error) {
      // TODO: throw ResourceAccess error
      if (client) {
        await client.close()
      }
    }
  } else {
    // just experimentation
    const knex = createKnex({
      client: config.dbType,
      connection: {
        filename: config.file
      },
      log: new KnexLogger(log)
    });

    log.info({knex})
  }




  return spaces
}