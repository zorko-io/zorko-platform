import assert from 'assert'
import {ContentAccess, QueryResult} from '../../core'
import {MongoContentModel} from './MongoContentModel'
import {MongoCursorIterator, MongoQuery, toObjectId} from '../util/index.mjs'
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

  async add(params) {
    const {content, repository} = params
    const model = new MongoContentModel({
      content: content.content,
      mime: content.mime,
      config: content.config
    })
    const collection = this.#getCollection({
      owner: repository.owner,
      repo: repository.name
    })
    let doc = model.toDocument()

    const result = await collection.insertOne(doc)

    return new MongoContentModel(result).toJSON()
  }

  iterate({query, repository} = {}) {
    let collection = this.#getCollection({
      owner: repository.owner,
      repo: repository.name
    })

    query = new MongoQuery({query}, {collection})

    let iterator = new MongoCursorIterator({
      cursor: query.makeResultsCursor()
    }, {
      wrapValue: (value) => {
        return new MongoContentModel({doc: value}).toJSON()
      }
    })

    let fetchTotal = async () => {
      let totalCursor = query.makeTotalCursor()
      let result = await totalCursor.next()
      return result.total
    }

    return new QueryResult({
      iterator,
      fetchTotal
    })
  }

  async get(params) {
    const {repository, owner, id} = params
    const collection = this.#getCollection({
      owner: owner,
      repo: repository
    })

    let doc

    try {
      doc = await collection.findOne({_id: toObjectId(id)})
    } catch (error) {
      throw new ResourceAccessError(error.message)
    }

    if (!doc) {
      throw new NotFoundError(`Can't find content with #id=${id}, #repo=${repository}, #owner=${owner}`)
    }

    return new MongoContentModel({doc}).toJSON()
  }

  async remove(params) {
    const {repository, owner, id} = params
    const collection = this.#getCollection({
      owner: owner,
      repo: repository
    })

    try {
      await collection.findOneAndDelete({_id: toObjectId(id)})
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