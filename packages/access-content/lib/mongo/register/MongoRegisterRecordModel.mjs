import {toObjectId} from '../util'
import {RegisterRecordModel}  from '../../core'
import {ResourceAccessError} from '@zorko-io/util-error/lib/index.mjs'

export class MongoRegisterRecordModel extends RegisterRecordModel{

  static name = 'register'

  static toCollectionName() {
    return 'register'
  }

  static schema = {
    bsonType: 'object',
    required: ['name', 'owner'],
    properties: {
      name: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      owner: {
        bsonType: 'string',
        description: 'must be a string and is required'
      }
    }
  }

  // TODO: `access-content` move to utils/helper
  static async createSchema(deps = {}) {
    const {log, db} = deps
    try {
      const collection = await db.createCollection(MongoRegisterRecordModel.toCollectionName(), {
        validator: {
          $jsonSchema: MongoRegisterRecordModel.schema
        }
      })

      collection.createIndex({
          name: 1,
          owner: 1
        }, {
          unique: true
        }
      )

    } catch (error) {
      if (error.codeName === 'NamespaceExists') {
        log.info(`Collection #name=${MongoRegisterRecordModel.toCollectionName()} was already created, skipping...`)
      } else {
        throw new ResourceAccessError(error.message)
      }
    }
  }


  static toProps = (doc) => {
    return {
      id: doc._id.toString(),
      owner: doc.owner,
      name: doc.name
    }
  }

  constructor(context) {
    let props = context

    if (context.ops || context.doc) {
      if (context.ops) {
        const doc = context.ops.pop()
        props = MongoRegisterRecordModel.toProps(doc)
      }else if (context.doc){
        props = MongoRegisterRecordModel.toProps(context.doc)
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
      owner: this.owner,
      ...result
    }
  }

}