import assert from 'assert'
import {Space} from '../core'

export class MongoSpace extends Space {

  static name = 'resources'

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
      ancestors: {
        bsonType: ["array"],
        uniqueItems: true,
        description: "list of inner resources"
      }
    }
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
}