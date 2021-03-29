import assert from 'assert'
import {RegisterAccess} from '../core'
import {MongoCursorIterator, toObjectId} from './util'
import {MongoRepositoryAccess} from './MongoRepositoryAccess'
import {NotFoundError} from '@zorko-io/util-error'
import {toIterable} from '@zorko-io/util-lang'
import {MongoContentAccess} from './MongoContentAccess'

export class MongoRegisterAccess extends RegisterAccess {

  static name = 'register'

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
  #deps = null

  /**
   *
   * @param {Object} context
   * @param {String} context.collection - name of collection
   * @param {Object} deps
   */

  constructor(context = {}, deps) {
    super()
    const {log, db,} = deps

    assert(context, 'should have context')
    assert(log,'should have a log')
    assert(db, 'should have a db')

    this.#deps = deps
    this.#context = context
    this.#db = db
    this.#log = deps.log
    this.#log = log.child({class:this.constructor.name})
    this.#collection = this.#db.collection(MongoRegisterAccess.name)
  }

  async add(owner, name = 'default') {
    assert(owner)
    assert(name)

    // TODO: check for if not exists, and other error handling
    let repositoryCollectionName = MongoRepositoryAccess.toCollectionName(owner,name)

    const result = await this.#collection.insertOne({
      owner,
      name: repositoryCollectionName
    })

    const doc = result.ops.pop()


    let contentCollectionName = MongoContentAccess.toCollectionName(owner, name)

    // TODO: handle errors, find better way to find insert results
    // - make a distinguish between name and location of target collection
    // - add validation schema

    await this.#db.createCollection(repositoryCollectionName)
    await this.#db.createCollection(contentCollectionName)

    return this.#createRepositoryAccess({doc})
  }

   iterate(query) {
    const cursor = this.#collection.find({
      owner: query.owner
    })

    return toIterable(
      new MongoCursorIterator({
        cursor
      },{
      wrapValue: this.#createRepositoryAccess
    }))
  }

  async get(id) {
    assert(id)

    // TODO: handle errors
    const doc = await this.#collection.findOne({ _id: toObjectId(id)})

    if(!doc) {
      throw new NotFoundError(`Can't find repo by #id=${id}`)
    }

    return this.#createRepositoryAccess({doc})
  }

  async remove(id) {
    assert(id)

    // TODO: handle errors
    const {value} =  await this.#collection.findOneAndDelete({ _id: toObjectId(id)})

    // TODO: handle corner cases
    await this.#db.collection(value.name).drop()
  }

  #createRepositoryAccess = (options) => {
    return this.#deps.createRepositoryAccess(options, this.#deps)
  }
}