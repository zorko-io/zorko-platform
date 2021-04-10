import assert from 'assert'
import {RegisterAccess} from '../../core'
import {MongoCursorIterator, toObjectId, wrapMongoError, createSchema} from '../util'
import {NotFoundError} from '@zorko-io/util-error'
import {toIterable} from '@zorko-io/util-lang'
import {MongoContentAccess} from '../content'
import {MongoRegisterRecordModel} from './MongoRegisterRecordModel'
import {MongoRepositoryResourceModel} from '../repository'
import {MongoContentModel} from '../content/MongoContentModel.mjs'

export class MongoRegisterAccess extends RegisterAccess {

  #db = null
  #log = null
  #context = null
  #collection = null
  #deps = null

  /**
   *
   * @param {Object} context
   * @param {Object} deps
   */

  constructor(context = {}, deps) {
    super()
    const {log, db} = deps

    assert(context, 'should have context')
    assert(log, 'should have a log')
    assert(db, 'should have a db')

    this.#deps = deps
    this.#context = context
    this.#db = db
    this.#log = deps.log
    this.#log = log.child({class: this.constructor.name})
    this.#collection = this.#db.collection(MongoRegisterRecordModel.toCollectionName())
  }

  async add(owner, name = 'default') {
    assert(owner)
    assert(name)

    let repositoryCollectionName = MongoRepositoryResourceModel.toCollectionName({owner, name})

    try {
      const result = await this.#collection.insertOne({
        owner,
        name: repositoryCollectionName
      })

      await createSchema({
        clazz: MongoRepositoryResourceModel,
        name: MongoRepositoryResourceModel.toCollectionName({owner, name})
      }, {
        log: this.#log,
        db: this.#db
      })

      let contentCollectionName = MongoContentModel.toCollectionName({owner, repo: name})

      await this.#db.createCollection(contentCollectionName)

      return new MongoRegisterRecordModel(result).toJSON()

    } catch (error) {
      wrapMongoError(
        error,
        `Repository with #name=${name} already created for #owner=${owner}`, {
          log: this.#log
        })
    }
  }

  iterate(query) {
    const cursor = this.#collection.find({
      owner: query.owner
    })

    return toIterable(
      new MongoCursorIterator({
        cursor
      }, {
        wrapValue: (value) => new MongoRegisterRecordModel({doc: value}).toJSON()
      }))
  }

  // TODO: 'access-content', get, error handling
  // label: tech-debt
  async get(id) {
    assert(id)

    // TODO: 'access-content', handle errors
    const doc = await this.#collection.findOne({_id: toObjectId(id)})

    if (!doc) {
      throw new NotFoundError(`Can't find repository record by #id=${id}`)
    }

    return new MongoRegisterRecordModel({doc}).toJSON()
  }

  // TODO: 'access-content', remove, error handling
  // label: tech-debt
  async remove(id) {
    assert(id)

    const {value} = await this.#collection.findOneAndDelete({_id: toObjectId(id)})

    // probalby we no need to be so radical and just mark it as deleted
    await this.#db.collection(value.name).drop()
  }

}