import assert from 'assert'
import {RepositoryAccess} from '../core'

export class MongoRepositoryAccess extends RepositoryAccess {

  static prefix = 'repository'

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

  /**
   *
   * @param {Object} context
   * @param {Object} deps
   * @param {Function} deps.createContentAccess
   */

  constructor(context = {}, deps = {}) {
    super();

    assert(context.doc)
    // TODO: 'access-content', repository, add permissions
    // label: tech-debt

    assert(deps.log)
    assert(deps.db)
    assert(deps.createContentAccess)
    assert(deps.createResourceAccess)

    this.#deps = deps
    this.#context = context
    this.#db = deps.db
    this.#log= deps.log

    let name = MongoRepositoryAccess.toCollectionName(
      this.#context.owner,
      this.#context.name
    )
    this.#collection = this.#db.collection(name)
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

    const contentAccess = this.#createContentAccess()

    const content = await contentAccess.add({
      content: params.content,
      permission: params.permission
    })

    const result = await this.#collection.insertOne({
      parent: params.path,
      name: params.name,
      content: content.properties.id,
      mime: params.mime,
      preview: params.preview
    })

    const doc = result.ops.pop()

    return this.#createResourceAccess({doc})
  }

  #createContentAccess = () => {
    let deps = this.#deps
    return deps.createContentAccess({doc: this.#context}, deps)
  }

  #createResourceAccess = (options) => {
    let deps = this.#deps;
    return deps.createResourceAccess(options, deps)
  }
}