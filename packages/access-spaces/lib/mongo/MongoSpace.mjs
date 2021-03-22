import assert from 'assert'
import {Space} from '../core'
import {MongoResource} from './MongoResource.mjs'
import {MongoContentAccess} from './MongoContentAccess.mjs'

export class MongoSpace extends Space {

  static prefix = 'space'

  static toCollectionName = (owner, space) => {
    return `${MongoSpace.prefix}.${owner}.${space}`
  }

  #context = null
  #db = null
  #log = null
  #collection = null

  constructor(context = {}, deps = {}) {
    super();

    assert(context.id)
    assert(context.owner)
    assert(context.name)
    // TODO: add permissions

    assert(deps.log)
    assert(deps.db)

    this.#context = context
    this.#db = deps.db
    this.#log= deps.log

    let name = MongoSpace.toCollectionName(
      this.#context.owner,
      this.#context.name
    )
    this.#collection = this.#db.collection(name)
  }

  get properties() {
    return {
      id: this.#context.id,
      owner: this.#context.owner,
      name: this.#context.name
    }
  }


  async add(params) {
    // TODO: need to check path on existence and uniq names in that folder

    const contentAccess = new MongoContentAccess({
      doc: this.#context
    }, {
      db: this.#db,
      log: this.#log
    });

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

    return new MongoResource({
      doc
    })

  }
}