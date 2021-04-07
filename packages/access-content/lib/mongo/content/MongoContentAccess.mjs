import assert from 'assert'
import {ContentAccess} from '../../core/content/ContentAccess'
import {MongoContentModel} from './MongoContentModel.mjs'

export class MongoContentAccess extends ContentAccess {

  static prefix = 'content'

  static schema = {}

  static toCollectionName = (owner, name) => {
    return `${MongoContentAccess.prefix}.${owner}.${name}`
  }

  static async createSchema(options = {},deps = {}) {
    const {owner , name} = options
    const {db} = deps

    let collectionName = MongoContentAccess.toCollectionName(owner, name)

    // TODO: { validator: {
    //       $jsonSchema: MongoResourceAccess.schema
    //     }}
    await db.createCollection(collectionName)
  }

  #collection = null
  #log = null
  #createContent = null
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

    // let name = MongoContentAccess.toCollectionName(
    //   context.doc.owner,
    //   context.doc.name
    // )

    this.#db = deps.db
    // this.#collection = deps.db.collection(name)
    this.#log = deps.log
    // this.#createContent = deps.createContent
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

    let name = MongoContentAccess.toCollectionName(
      owner,
      repo
    )

    const collection = this.#db.collection(name)

    let doc = model.toDocument()

    const result = await collection.insertOne(doc)

    return new MongoContentModel(result).toJSON()
  }

}