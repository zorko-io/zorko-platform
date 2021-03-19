import assert from 'assert'
import {Space} from '../core'

export class MongoSpace extends Space {

  static prefix = 'space'

  static toCollectionName = (owner, space) => {
    return `${MongoSpace.prefix}.${owner}.${space}`
  }

  #context = null
  #db = null
  #log = null

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
  }

  get properties() {
    return {
      id: this.#context.id,
      owner: this.#context.owner,
      name: this.#context.name
    }
  }

  async add(path, name, content) {

  }
}