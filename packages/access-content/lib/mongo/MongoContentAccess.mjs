import assert from 'assert'
import {Access} from '../core'

export class MongoContentAccess extends Access {

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
   * @param {Object} context.doc - raw mongo doc
   * @param {Object} deps
   * @param {Object} deps.log
   * @param {Object} deps.createContent - factory function to create content
   * @param {Object} deps.db - mongo driver db
   */

  constructor(context = {}, deps = {}) {
    super()

    assert(context)
    assert(context.doc)
    assert(deps.log)
    assert(deps.db)
    assert(deps.createContent)

    this.#doc = context.doc

    let name = MongoContentAccess.toCollectionName(
      context.doc.owner,
      context.doc.name
    )

    this.#db = deps.db
    this.#collection = deps.db.collection(name)
    this.#log = deps.log
    this.#createContent = deps.createContent
  }


  get properties() {
    return {
      id: this.#doc._id
    }
  }

  async add({content, permission, resourceId, mime} = {}) {
    // TODO: add error handling
    const result = await this.#collection.insertOne({
      ...content,
      resource: {
        mime,
        permission,
        id: resourceId
      }
    })

    const doc = result.ops.pop()

    return this.#createContent({doc}, {
      log: this.#log,
      db: this.#db
    })
  }
}