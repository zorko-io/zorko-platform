import assert from 'assert'
import {RepositoryAccess} from '../../core'
import {MongoRepositoryResourceModel} from './MongoRepositoryResourceModel'

export class MongoRepositoryAccess extends RepositoryAccess {

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

    // TODO: 'access-content' clean up, it's outdated code,
    //  concrete collection should be determined on method level
    let name = MongoRepositoryResourceModel.toCollectionName(
      this.#context.owner,
      this.#context.name
    )
    this.#collection = this.#db.collection(name)
    this.#content = deps.content
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

    const model = new MongoRepositoryResourceModel({
      path: params.path,
      name: params.name,
      content: content.id,
      mime: params.mime,
      preview: params.preview
    })

    const result = await this.#collection.insertOne(
      model.toDocument()
    )

    return new MongoRepositoryResourceModel(result).toJSON()
  }
}