import assert from 'assert'
import {Resource} from '../core/index.mjs'

export class MongoResource extends Resource {

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

  #doc = null

  constructor(context={}) {
    super()

    assert(context)
    assert(context.doc)

    this.#doc = context.doc
  }


  get properties() {
    return {
      id: this.#doc._id.toString(),
      name: this.#doc.name,
      path: `${this.#doc.parent}${this.#doc.name}`,
      mime: this.#doc.mime,
      preview: this.#doc.preview,
      content: this.#doc.content
    }
  }
}