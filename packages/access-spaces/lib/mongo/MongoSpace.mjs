import assert from 'assert'
import {Space} from '../core'

export class MongoSpace extends Space {

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

  async describe() {
    return {
      id: this.#context.id,
      owner: this.#context.owner,
      name: this.#context.name
    }
  }
}