import {toObjectId, enhanceWithMongo} from '../util'
import {RegisterRecordModel} from '../../core'

export const MongoRegisterRecordModel = enhanceWithMongo({
  clazz: RegisterRecordModel,
  adapter: {
    schema: {
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
    },
    index: [{name: 1, owner: 1}, {unique: true}],
    toCollectionName: () => 'register',
    toProps(doc) {
      return {
        id: doc._id.toString(),
        owner: doc.owner,
        name: doc.name
      }
    },
    toDocument(props) {
      let result = {}

      if (props.id) {
        result._id = toObjectId(props.id)
      }

      return {
        name: props.name,
        owner: props.owner,
        ...result
      }
    }
  }
})