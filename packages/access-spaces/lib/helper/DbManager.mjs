import mongo from 'mongodb'
import { MongoMemoryServer} from 'mongodb-memory-server'

export class DbManager {
  #mongod = null
  #client = null
  #log = null

  constructor(deps = {log: console}) {
    this.#mongod = new MongoMemoryServer()
    this.#log= deps.log
  }

  async start() {
    const uri = await this.#mongod.getUri()
    this.#client = new mongo.MongoClient(uri, {
      useUnifiedTopology:true,
      useNewUrlParser: true
    });

    try {
      await this.#client.connect();
      await this.#client.db("admin").command({ping: 1});
      this.#log.debug('Connection established')

      return {
        uri
      }

    } finally {
      await this.#client.close();
      this.#log.debug('Connection closed')
    }
  }

  async stop() {
    await this.#mongod.stop()
    await this.#client.close()
  }


}