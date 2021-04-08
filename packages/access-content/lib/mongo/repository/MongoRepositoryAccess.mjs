import assert from 'assert'
import {RepositoryAccess} from '../../core/index.mjs'
import {MongoRepositoryResourceModel} from './MongoRepositoryResourceModel.mjs'

export class MongoRepositoryAccess extends RepositoryAccess {

  static prefix = 'repository'

  static schema = {
    bsonType: "object",
    required: [ "name", "parent"],
    properties: {
      name: {
        bsonType: "string",
        description: "must be a string and is required"
      },
      parent: {
        bsonType: "string",
        description: "Id of parent resource"
      },
      content: {
        bsonType: "string",
        description: "Content Id"
      }
    }
  }

  static toCollectionName = (owner, space) => {
    return `${MongoRepositoryAccess.prefix}.${owner}.${space}`
  }

  static async createSchema(options = {},deps = {}) {
    const {owner , name} = options
    const {db} = deps

    let repositoryCollectionName = MongoRepositoryAccess.toCollectionName(owner, name)

    // TODO: { validator: {
    //       $jsonSchema: MongoResourceAccess.schema
    //     }}
    await db.createCollection(repositoryCollectionName)
  }

  #context = null
  #deps = null
  #db = null
  #log = null
  #collection = null
  #content = null

  /**
   *
   * @param {Object} context
   * @param {Object} deps
   * @param {ContentAccess} deps.content
   */

  constructor(context = {}, deps = {}) {
    super();

    // TODO: 'access-content', repository, add permissions
    // label: tech-debt

    assert(deps.log)
    assert(deps.db)
    assert(deps.content)

    this.#deps = deps
    this.#context = context
    this.#db = deps.db
    this.#log= deps.log

    // TODO: 'access-content' clean up
    let name = MongoRepositoryAccess.toCollectionName(
      this.#context.owner,
      this.#context.name
    )
    this.#collection = this.#db.collection(name)
    this.#content = deps.content
  }

  get properties() {
    return {
      id: this.#context.doc._id.toString(),
      owner: this.#context.doc.owner,
      name: this.#context.doc.name
    }
  }

  async add(params) {
    // TODO: 'access-content', need to check path on existence and uniq names in that folder
    // label: tech-debt

    const content = await this.#content.add({
      content: params.content,
      mime: params.mime,
      repo: params.repo,
      owner: params.owner
    })



    const result = await this.#collection.insertOne({
      parent: params.path,
      name: params.name,
      content: content.id,
      mime: params.mime,
      preview: params.preview
    })

    return new MongoRepositoryResourceModel(result)
  }
}