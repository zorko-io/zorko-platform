import assert from 'assert'
import {RepositoryAccess} from '../../core'
import {MongoRepositoryResourceModel} from './MongoRepositoryResourceModel'

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

    // TODO: 'access-content', repository, add permissions
    // label: tech-debt

    assert(deps.log)
    assert(deps.db)
    assert(deps.content)

    this.#deps = deps
    this.#db = deps.db
    this.#log = deps.log
    this.#content = deps.content
  }

  async add(params) {
    // TODO: 'access-content', need to check path on existence and uniq names in that folder
    // label: tech-debt

    const content = await this.#content.add({
      content: {
        content: params.content,
        mime: params.mime
      },
      repository: {
        name: params.repo,
        owner: params.owner
      }
    })

    const model = new MongoRepositoryResourceModel({
      path: params.path,
      name: params.name,
      content: content.id,
      mime: params.mime,
      preview: params.preview
    })

    const result = await this.#getCollection({
      owner: params.owner,
      name: params.name
    }).insertOne(
      model.toDocument()
    )

    return new MongoRepositoryResourceModel(result).toJSON()
  }

  #getCollection = ({owner, name} = {}) => {
    // TODO: 'access-content' clean up, it's outdated code,
    //  concrete collection should be determined on method level
    let collection = MongoRepositoryResourceModel.toCollectionName(
      owner,
      name
    )
    return this.#db.collection(collection)
  }
}