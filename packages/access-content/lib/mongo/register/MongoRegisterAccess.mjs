import assert from 'assert'
import {RegisterAccess} from '../../core'
import {MongoCursorIterator, wrapMongoError, createSchema} from '../util'
import {NotFoundError} from '@zorko-io/util-error'
import {toIterable} from '@zorko-io/util-lang'
import {MongoRegisterRecordModel} from './MongoRegisterRecordModel'
import {MongoResource} from '../repository'
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

  async allocateNewRepo({owner, repo = 'default'} = {}) {
    let repositoryCollectionName = MongoResource.toCollectionName({owner, repo})
    let contentCollectionName = MongoContentModel.toCollectionName({owner, repo})

    try {
      const result = await this.#collection.insertOne({
        owner,
        name: repositoryCollectionName
      })

      await createSchema({
        clazz: MongoResource,
        name: repositoryCollectionName
      }, {
        log: this.#log,
        db: this.#db
      })

      await createSchema({
        clazz: MongoContentModel,
        name: contentCollectionName
      }, {
        log: this.#log,
        db: this.#db
      })

      return new MongoRegisterRecordModel(result).toJSON()

    } catch (error) {
      wrapMongoError(
        error,
        `Repository with #name=${repo} already created for #owner=${owner}`, {
          log: this.#log
        })
    }
  }

  iterate(query) {
    let cursor

    try {
      cursor = this.#collection.find({
        owner: query.owner
      })
    }catch (error) {
      wrapMongoError(error, null, {log: this.#log})
    }

    return toIterable(
      new MongoCursorIterator({
        cursor
      }, {
        wrapValue: (value) => new MongoRegisterRecordModel({doc: value}).toJSON()
      }))
  }

  async get({repo, owner}) {
    let doc

    try {
      doc = await this.#collection.findOne({
        name: repo,
        owner: owner
      })

    } catch (error) {
      wrapMongoError(error, null, {log: this.#log})
    }

    if (!doc) {
      throw new NotFoundError(`Can't find repository record by #repo=${repo}, #owner=${owner}`)
    }

    return new MongoRegisterRecordModel({doc}).toJSON()
  }

  async remove({repo, owner}) {
    try {
      const {value} = await this.#collection.findOneAndDelete({name: repo, owner})

      // probably we no need to be so radical and just mark it as deleted
      await this.#db.collection(value.name).drop()
    }catch (error) {
      wrapMongoError(error, null, {log: this.#log})
    }
  }
}