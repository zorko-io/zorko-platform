import {toObjectId} from '../util'
import {RepositoryResourceModel} from '../../core'

export class MongoRepositoryResourceModel extends RepositoryResourceModel{
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
      },
      mime: {
        bsonType: "string",
        description: "Mime Types Id"
      }
    }
  }

  static toCollectionName = (owner, space) => {
    return `${MongoRepositoryResourceModel.prefix}.${owner}.${space}`
  }

  static async createSchema(options = {},deps = {}) {
    const {owner , name} = options
    const {db} = deps

    let repositoryCollectionName = MongoRepositoryResourceModel.toCollectionName(owner, name)

    // TODO: { validator: {
    //       $jsonSchema: MongoResourceAccess.schema
    //     }}
    await db.createCollection(repositoryCollectionName)
  }

  static toProps = (doc) => {
    return {
      id: doc._id.toString(),
      name: doc.name,
      path: `${doc.parent}${doc.name}`,
      content: doc.content,
      mime: doc.mime,
      preview: doc.preview
    }
  }

  constructor(context) {
    let props = context

    if (context.ops || context.doc) {
      if (context.ops) {
        const doc = context.ops.pop()
        props = MongoRepositoryResourceModel.toProps(doc)
      }else if (context.doc){
        props = MongoRepositoryResourceModel.toProps(context.doc)
      }
    }

    super(props)
  }

  toDocument() {
    let result = {}

    if (this.id){
      result._id = toObjectId(this.id)
    }

    return {
      name: this.name,
      parent: this.path.replace(this.name, ''),
      content: this.content,
      mime: this.mime,
      preview: this.preview,
      ...result
    }
  }

}