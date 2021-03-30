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

    let repositoryCollectionName = MongoRepositoryAccess.toCollectionName(owner,name)

    // TODO: 'access-content', throw an exception if it already exists
    const result = await this.#collection.insertOne({
      owner,
      name: repositoryCollectionName
    })

    const doc = result.ops.pop()


    let contentCollectionName = MongoContentAccess.toCollectionName(owner, name)

    // TODO: 'access-content' creation of collections
    // - handle errors (wrap in resource access error)
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

  // TODO: 'access-content', get, error handling
  // label: tech-debt
  async get(id) {
    assert(id)

    // TODO: 'access-content', handle errors
    const doc = await this.#collection.findOne({ _id: toObjectId(id)})

    if(!doc) {
      throw new NotFoundError(`Can't find repo by #id=${id}`)
    }

    return this.#createRepositoryAccess({doc})
  }

  // TODO: 'access-content', remove, error handling
  // label: tech-debt
  async remove(id) {
    assert(id)

    const {value} =  await this.#collection.findOneAndDelete({ _id: toObjectId(id)})

    await this.#db.collection(value.name).drop()
  }

  #createRepositoryAccess = (options) => {
    return this.#deps.createRepositoryAccess(options, this.#deps)
  }
}