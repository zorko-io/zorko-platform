import _ from 'lodash'
import {enhanceWithMongo, toObjectId} from '../util'
import {ContentModel} from '../../core'

export const MongoContentModel = enhanceWithMongo({
  clazz: ContentModel,
  adapter: {
    toProps  (doc) {
      const decodeSpecialCharters = (content) => {
        content = _.cloneDeep(content)
        const spec = content.spec

        if (spec) {
          const value = spec['_schema']
          delete spec['_schema']
          spec['$schema'] = value
        }

        return content
      }

      return {
        id: doc._id.toString(),
        content: decodeSpecialCharters(
          doc.content
        ),
        mime: doc.mime,
        config: doc.config
      }
    },
    toDocument(props) {
      let result = {}

      if (props.id){
        result._id = toObjectId(props.id)
      }

      const encodeSpecialCharters = (content) => {
        content = _.cloneDeep(content)
        const spec = content.spec

        if (spec) {
          const value = spec['$schema']
          delete spec['$schema']
          spec['_schema'] = value
        }

        return content
      }

      let content = encodeSpecialCharters(
        props.content
      )

      return {
        content: content,
        mime: props.mime,
        config: props.config,
        ...result
      }
    }

  }
})