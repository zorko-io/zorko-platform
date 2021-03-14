import assert from 'assert'
import {SpaceRegister} from '../core'
import {MongoCursorIterator} from './MongoCursorIterator'
import {MongoSpace} from './MongoSpace'
import {NotFoundError} from '@zorko-io/util-error'
import {toIterable} from '@zorko-io/util-lang'

export class MongoSpaceRegister extends SpaceRegister {

  static name = 'spaces.register'

  static schema = {
    bsonType: "object",
    required: [ "name", "owner"],
    properties: {
      name: {
        bsonType: "string",
        description: "must be a string and is required"
      },
      owner: {
        bsonType: "string",
        description: "must be a string and is required"
      }
    }
  }

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
    const {log, db, collection} = deps

    assert(context)
    assert(log)
    assert(db)

    this.#context = context
    this.#db = db
    this.#log = log
    this.#collection = collection
  }

  // TODO: probably return new space...
  async allocateSpaceIfNotExists(owner) {
    assert(owner)

    // TODO: check for if not exists, and other error handling
    let name = `${MongoSpaceRegister.name}.${owner}.default`
    const result = await this.#collection.insertOne({owner, name })

    const doc = result.ops.pop()


    // TODO: handle errors, find better way to find insert results
    // - make a distinguish between name and location of target collection
    // - add validation schema
    await this.#db.createCollection(doc.name)

    return this.#createMongoSpace(doc)
  }

   iterate(query) {
    const cursor = this.#collection.find({
      owner: query.owner
    })

    return toIterable(
      new MongoCursorIterator({
        cursor
      },{
      wrapValue: this.#createMongoSpace
    }))
  }

  async get(id) {
    assert(id)

    // TODO: handle errors
    const doc = await this.#collection.findOne({ _id: id})

    if(!doc) {
      throw new NotFoundError(`Can't find space by #id=${id}`)
    }

    return this.#createMongoSpace(doc)
  }

  async remove(id) {
    assert(id)

    // TODO: handle errors
    const {value} =  await this.#collection.findOneAndDelete({ _id: id})

    // TODO: handle corner cases
    await this.#db.collection(value.name).drop()
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