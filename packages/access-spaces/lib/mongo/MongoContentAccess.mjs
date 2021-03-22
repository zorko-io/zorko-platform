import assert from 'assert'
import {Access} from '../core/Access.mjs'
import {createMongoContent} from './createMongoContent'

export class MongoContentAccess extends Access {

  static prefix = 'content'

  static schema = {}

  static toCollectionName = (owner, name) => {
    return `${MongoContentAccess.prefix}.${owner}.${name}`
  }

  #collection = null

  constructor(context = {}, deps = {}) {
    super()

    assert(context)
    assert(context.doc)
    assert(deps.log)
    assert(deps.db)

    let name = MongoContentAccess.toCollectionName(
      context.doc.owner,
      context.doc.name
    )

    this.#collection = deps.db.collection(name)
  }


  async add({content, permission, resourceId, mime} = {}) {
    const result = await this.#collection.insertOne({
      ...content,
      resource: {
        mime,
        permission,
        id: resourceId
      }
    })

    const doc = result.ops.pop()

    return createMongoContent(doc, {})
  }
}