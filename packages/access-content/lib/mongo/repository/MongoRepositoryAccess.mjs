import assert from 'assert'
import {QueryResult, RepositoryAccess} from '../../core'
import {MongoRepositoryResourceModel} from './MongoRepositoryResourceModel'
import {MongoCursorIterator, MongoQuery, toObjectId} from '../util/index.mjs'
import {NotFoundError, ResourceAccessError} from '@zorko-io/util-error/lib/index.mjs'

// TODO: 'access-content', move to utils
function uriToString (uri) {
  return `${uri.owner}/${uri.repo}${uri.path}`
}

function splitResourcePath(path) {
  const name = path.split('/').pop()

  return {
    parent: path.replace(name, ''),
    name,
  }
}

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

  async add({resource, folder, content} = {}) {
    // TODO: 'access-content', need to check path on existence and uniq names in that folder
    // label: tech-debt

    const {id} = await this.#content.add({
      content: {
        content: content,
        mime: resource.mime
      },
      repository: {
        name: folder.repo,
        owner: folder.owner
      }
    })

    const model = new MongoRepositoryResourceModel({
      parent: folder.path,
      name: resource.name,
      content: id,
      mime: resource.mime,
      preview: resource.preview,
      permission: resource.permission
    })

    const result = await this.#getCollection(folder).insertOne(
      model.toDocument()
    )

    return new MongoRepositoryResourceModel(result).toJSON()
  }

  async get(params) {
    const { uri } = params
    const collection = this.#getCollection(uri)
    const {name, parent} = splitResourcePath(uri.path)

    let doc

    try {
      doc = await collection.findOne({name, parent})
    } catch (error) {
      throw new ResourceAccessError(error.message)
    }

    if (!doc) {
      let message = `Can't find resource with #uri=${uriToString(uri)}`
      throw new NotFoundError(message)
    }

    return new MongoRepositoryResourceModel({doc}).toJSON()
  }

  list(params) {
    const  {filter, path, limit, offset}  = params
    let folder = path.folder || '/'

    let collection = this.#getCollection(path)

    const query = new MongoQuery({
      query: {
        filter: Object.keys(filter || {}).reduce((memo,key) => {
          let val = filter[key]
          if (val) {
            memo.push({field: key, equal: val})
          }
          return memo
        }, [{field:'parent', equal: folder}]),
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
    const {uri } = params
    const collection = this.#getCollection(uri)
    const {parent, name} = splitResourcePath(uri.path)

    try {
      await collection.findOneAndDelete({name, parent})
    } catch (error) {
      throw new ResourceAccessError(error.message)
    }
  }

  #getCollection = ({owner, repo} = {}) => {
    let collection = MongoRepositoryResourceModel.toCollectionName(
      owner,
      repo
    )
    return this.#db.collection(collection)
  }
}