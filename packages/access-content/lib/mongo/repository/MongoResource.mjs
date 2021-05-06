import {enhanceWithMongo, toObjectId} from '../util'
import {Resource} from '../../core'

export const MongoResource = enhanceWithMongo({
  clazz: Resource,
  adapter: {
    schema : {
      bsonType: "object",
      required: [ "name", "parent", "permission", "content", "mime"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        parent: {
          bsonType: "string",
          description: "path to the parent resource"
        },
        mime: {
          bsonType: "string",
          description: "Mime Types Id"
        },
        permission: {
          bsonType: "string",
          description: "Permission to the resource"
        }
      }
    },
    toCollectionName ({owner, repo} = {}) {
      repo = repo || 'default'
      return `repository.${owner}.${repo}`
    },

    toProps (doc) {
      return {
        id: doc._id.toString(),
        parent: doc.parent,
        name: doc.name,
        mime: doc.mime,
        preview: doc.preview,
        permission: doc.permission
      }
    },

    toDocument(props) {
      let result = {}

      if (props.id){
        result._id = toObjectId(props.id)
      }

      return {
        name: props.name,
        parent: props.parent,
        mime: props.mime,
        preview: props.preview,
        permission: props.permission,
        ...result
      }
    }
  }
})