import assert from 'assert'
import {Spaces} from '../core'
import {MongoSpacesPromisifyIterator} from './MongoSpacesPromisifyIterator'
import {MongoSpace} from './MongoSpace'

export class MongoSpaces extends Spaces {

  static COLLECTION_NAME = 'spaces'

  #db = null
  #log = null
  #context = null
  #collection = null

  /**
   *
   * @param {Object} context
   * @param {String} context.collection - name of collection
   * @param {Object} deps
   */

  constructor(context = {}, deps) {
    super()
    const {log, db} = deps

    assert(context)
    assert(log)
    assert(db)

    this.#context = context
    this.#db = db
    this.#log = log
    let collection = context.collection || MongoSpaces.COLLECTION_NAME
    this.#collection = db.collection(collection)
  }

  // TODO: probably return new space...
  async allocateSpaceIfNotExists(owner) {
    // TODO: check for if not exists, and other error handling
    let name = `${MongoSpaces.COLLECTION_NAME}.${owner}.default`
    const result = await this.#collection.insertOne({owner, name })

    const doc = result.ops.pop()


    // TODO: handle errors, find better way to find insert results
    // TODO: make a distinguish between name and location of target collection
    await this.#db.createCollection(doc.name)

    return this.#createMongoSpace(doc)
  }

   iterate(query) {
    const cursor = this.#collection.find({
      owner: query.owner
    })

    return new MongoSpacesPromisifyIterator({
      cursor
    }, {
      log: this.#log,
      createSpace: this.#createMongoSpace
    })
  }


  #createMongoSpace = (doc) => {
    return new MongoSpace({
      id: doc._id,
      name: doc.name,
      owner: doc.owner
    }, {
      db: this.#db,
      log: this.#log
    })
  }

}