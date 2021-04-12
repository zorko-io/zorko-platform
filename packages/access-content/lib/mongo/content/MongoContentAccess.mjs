import assert from 'assert'
import {ContentAccess} from '../../core'
import {MongoContentModel} from './MongoContentModel'

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
    let name = MongoContentModel.toCollectionName({
      owner: repository.owner,
      repo: repository.name
    })
    const collection = this.#db.collection(name)
    let doc = model.toDocument()

    const result = await collection.insertOne(doc)

    return new MongoContentModel(result).toJSON()
  }

}