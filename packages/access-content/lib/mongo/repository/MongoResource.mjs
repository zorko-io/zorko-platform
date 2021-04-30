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
        content: {
          bsonType: "string",
          description: "Content Id"
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
    toCollectionName ({owner, name} = {}) {
      name = name || 'default'
      return `repository.${owner}.${name}`
    },

    toProps (doc) {
      return {
        id: doc._id.toString(),
        parent: doc.parent,
        name: doc.name,
        content: doc.content,
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
        content: props.content,
        mime: props.mime,
        preview: props.preview,
        permission: props.permission,
        ...result
      }
    }
  }
})