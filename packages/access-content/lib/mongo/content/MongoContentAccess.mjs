import assert from 'assert'
import {ContentAccess, ResourceUri} from '../../core'
import {MongoContentModel} from './MongoContentModel'
import {wrapMongoError} from '../util/index.mjs'
import {NotFoundError, ResourceAccessError} from '@zorko-io/util-error'

export class MongoContentAccess extends ContentAccess {
  #log = null
  #db = null

  /**
   * @constructor
   * @param {Object} deps
   * @param {Object} deps.log - logger
   * @param {Object} deps.db - mongo driver db
   */

  constructor(deps = {}) {
    super()

    assert(deps.log)
    assert(deps.db)

    this.#db = deps.db
    this.#log = deps.log
  }

  async writeAsObject(params) {
    const { uri, content } = params

    const collection = this.#getCollection(uri)

    const model = new MongoContentModel({
      content: content,
      path: uri.path
    })

    const doc = model.toDocument()

    try {
      await collection.insertOne(doc)
    }catch (error) {
      wrapMongoError(
        error,
        `Content with #uri=${ResourceUri.asString(uri)} was already created`, {
          log: this.#log
        })
    }
  }

  async readAsObject(params) {
    const {uri} = params
    const collection = this.#getCollection(uri)

    let doc

    try {
      doc = await collection.findOne({path: uri.path})
    } catch (error) {
      throw new ResourceAccessError(error.message)
    }

    if (!doc) {
      throw new NotFoundError(`Can't find content with #uri=${ResourceUri.asString(uri)}`)
    }

    let result = new MongoContentModel({doc}).toJSON()
    return result.content
  }

  async removeContent(params) {
    const {uri} = params
    const collection = this.#getCollection(uri)

    try {
      await collection.findOneAndDelete({path: uri.path})
    } catch (error) {
      throw new ResourceAccessError(error.message)
    }
  }

  #getCollection = ({owner, repo} = {}) => {
    let collection = MongoContentModel.toCollectionName({
      owner, repo
    })
    return this.#db.collection(collection)
  }
}