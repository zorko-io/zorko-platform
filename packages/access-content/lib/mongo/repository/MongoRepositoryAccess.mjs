import assert from 'assert'
import {QueryResult, RepositoryAccess} from '../../core'
import {MongoRepositoryResourceModel} from './MongoRepositoryResourceModel'
import {MongoCursorIterator, MongoQuery, toObjectId} from '../util/index.mjs'
import {NotFoundError, ResourceAccessError} from '@zorko-io/util-error/lib/index.mjs'
import {MongoContentModel} from '../content/MongoContentModel.mjs'

export class MongoRepositoryAccess extends RepositoryAccess {

  #deps = null
  #db = null
  #log = null
  #content = null

  /**
   * @constructor
   * @param {Object} deps
   * @param {ContentAccess} deps.log
   * @param {ContentAccess} deps.db
   * @param {ContentAccess} deps.content
   */

  constructor(deps = {}) {
    super()

    assert(deps.log)
    assert(deps.db)
    assert(deps.content)

    this.#deps = deps
    this.#db = deps.db
    this.#log = deps.log
    this.#content = deps.content
  }

  async add({resource, repository, content} = {}) {
    // TODO: 'access-content', need to check path on existence and uniq names in that folder
    // label: tech-debt

    const {id} = await this.#content.add({
      content: {
        content: content,
        mime: resource.mime
      },
      repository
    })

    const model = new MongoRepositoryResourceModel({
      parent: resource.parent,
      name: resource.name,
      content: id,
      mime: resource.mime,
      preview: resource.preview,
      permission: resource.permission
    })

    const result = await this.#getCollection(repository).insertOne(
      model.toDocument()
    )

    return new MongoRepositoryResourceModel(result).toJSON()
  }


  async get(params) {
    const {repository, resource: {id}} = params
    const collection = this.#getCollection(repository)

    let doc

    try {
      doc = await collection.findOne({_id: toObjectId(id)})
    } catch (error) {
      throw new ResourceAccessError(error.message)
    }

    if (!doc) {
      let message = `Can't find resource with #id=${id},` +
        ` #repo=${repository.name}, #owner=${repository.owner}`
      throw new NotFoundError(message)
    }

    return new MongoRepositoryResourceModel({doc}).toJSON()
  }

  list(params) {
    const  {repository, filter, path, limit, offset}  = params
    let collection = this.#getCollection(repository)

    const query = new MongoQuery({
      query: {
        filter: Object.keys(filter || {}).reduce((memo,key) => {
          let val = filter[key]
          if (val) {
            memo.push({field: key, equal: val})
          }
          return memo
        }, [{field:'parent', equal: path}]),
        limit,
        offset
      }
    }, {collection})

    let iterator = new MongoCursorIterator({
      cursor: query.makeResultsCursor()
    }, {
      wrapValue: (value) => {
        return new MongoRepositoryResourceModel({doc: value}).toJSON()
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

  async remove(params) {
    const {repository, resource: {id}} = params
    const collection = this.#getCollection(repository)

    try {
      await collection.findOneAndDelete({_id: toObjectId(id)})
    } catch (error) {
      throw new ResourceAccessError(error.message)
    }
  }

  #getCollection = ({owner, name} = {}) => {
    let collection = MongoRepositoryResourceModel.toCollectionName(
      owner,
      name
    )
    return this.#db.collection(collection)
  }
}