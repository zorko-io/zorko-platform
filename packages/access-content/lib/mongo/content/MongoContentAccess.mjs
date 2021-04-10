import assert from 'assert'
import {ContentAccess} from '../../core/content/ContentAccess'
import {MongoContentModel} from './MongoContentModel.mjs'

export class MongoContentAccess extends ContentAccess {
  #log = null
  #doc = null
  #db = null

  /**
   *
   * @param {Object} context
   * @param {Object} deps
   * @param {Object} deps.log
   * @param {Object} deps.createContent - factory function to create content
   * @param {Object} deps.db - mongo driver db
   */

  constructor(context = {}, deps = {}) {
    super()

    assert(context)
    assert(deps.log)
    assert(deps.db)

    this.#doc = context.doc
    this.#db = deps.db
    this.#log = deps.log
  }


  get properties() {
    return {
      id: this.#doc._id
    }
  }

  async add({content, mime, owner, repo, config} = {}) {

    const model = new MongoContentModel({
      content,
      mime,
      config
    })

    // TODO: `access-content` - make an owner part of repo name
    assert(repo, 'should have repo')
    assert(owner, 'should have owner')

    let name = MongoContentModel.toCollectionName({
      owner,
      repo
    })

    const collection = this.#db.collection(name)

    let doc = model.toDocument()

    const result = await collection.insertOne(doc)

    return new MongoContentModel(result).toJSON()
  }

}