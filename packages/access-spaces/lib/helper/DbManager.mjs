import mongo from 'mongodb'
import {MongoMemoryServer} from 'mongodb-memory-server'

export class DbManager {
  #mongod = null
  #client = null
  #log = null

  constructor(deps = {log: console}) {
    this.#mongod = new MongoMemoryServer()
    this.#log = deps.log
  }

  async start() {
    const uri = await this.#mongod.getUri()
    this.#client = new mongo.MongoClient(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    await this.#client.connect()
    await this.#client.db('admin').command({ping: 1})
    this.#log.debug('Connection established')

    return {
      dbType: 'mongodb',
      uri
    }

  }

  async stop() {
    await this.#client.close()
    await this.#mongod.stop()
  }

  async clean() {
    const db = this.#client.db()
    const cursor = db.listCollections()
    const collections  = await cursor.toArray()

    for (let collection of collections) {
      await db.dropCollection(collection.name)
    }
  }
}