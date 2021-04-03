import assert from 'assert'
import {AccessContentFacade} from '../core'
import mongo from 'mongodb'
import {MongoRegisterAccess} from './register/MongoRegisterAccess.mjs'
import {ApplicationError, ResourceAccessError} from '@zorko-io/util-error'
import {MongoRepositoryAccess} from './MongoRepositoryAccess.mjs'

export class MongoAccessContentFacade extends AccessContentFacade {

  #deps = null
  #register = null
  #content = null
  #repository = null
  #db = null

  constructor(context = {}, deps) {
    super()

    assert(context, 'should have #context')
    assert(context.onReady, 'should have #onReady')
    assert(context.onFailure, 'should #onFailure')
    assert(deps.log, 'should have #log')

    this.#deps = deps

    this.#createConnection(context)
      .then(context.onReady)
      .catch(context.onFailure)
  }

  get register() {
    if (this.#register) {
      return this.#register
    }

    assert(this.#db, 'should have #db')

    this.#register = new MongoRegisterAccess({}, {
      ...this.#deps,
      db: this.#db
    })

    return this.#register
  }

  get content() {
    return super.content;
  }

  get repository() {
    if (this.#repository) {
      return this.#repository
    }

    assert(this.#db, 'should have #db')

    this.#repository = new MongoRepositoryAccess({}, {
      ...this.#deps,
      db: this.#db
    })

    return this.#repository
  }

  #createConnection = async (context)  => {
    let client
    let {log} = this.#deps
    let {uri}= context

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

      this.#db = db

      return this
    } catch (error) {
      if (client) {
        await client.close()
      }
      if (!(error instanceof ApplicationError)) {
        throw new ResourceAccessError(error.message)
      }
    }
  }

}