import {enhanceWithMongo, toObjectId} from '../util'
import {RepositoryResourceModel} from '../../core'

export const MongoRepositoryResourceModel = enhanceWithMongo({
  clazz: RepositoryResourceModel,
  adapter: {
    schema : {
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
    },
    toCollectionName ({owner, name} = {}) {
      name = name || 'default'
      return `repository.${owner}.${name}`
    },

    toProps (doc) {
      return {
        id: doc._id.toString(),
        name: doc.name,
        path: `${doc.parent}/${doc.name}`,
        content: doc.content,
        mime: doc.mime,
        preview: doc.preview
      }
    },

    toDocument(props) {
      let result = {}

      if (props.id){
        result._id = toObjectId(props.id)
      }

      return {
        name: props.name,
        parent: props.path.replace('/' + props.name, ''),
        content: props.content,
        mime: props.mime,
        preview: props.preview,
        ...result
      }
    }
  }
})