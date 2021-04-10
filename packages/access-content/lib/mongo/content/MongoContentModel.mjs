import _ from 'lodash'
import {enhanceWithMongo, toObjectId} from '../util'
import {ContentModel} from '../../core'
import assert from 'assert'

export const MongoContentModel = enhanceWithMongo({
  clazz: ContentModel,
  adapter: {

    toCollectionName  ({owner, repo} = {}) {
      assert(owner)
      assert(repo)

      return `content.${owner}.${repo}`
    },

    toProps  (doc) {

      return {
        id: doc._id.toString(),
        content: MongoContentModel.decodeSpecialCharters(
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

      let content = MongoContentModel.encodeSpecialCharters(
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

MongoContentModel.decodeSpecialCharters = (content) => {
  content = _.cloneDeep(content)
  const spec = content.spec

  if (spec) {
    const value = spec['_schema']
    delete spec['_schema']
    spec['$schema'] = value
  }

  return content
}

MongoContentModel.encodeSpecialCharters = (content) => {
  content = _.cloneDeep(content)
  const spec = content.spec

  if (spec) {
    const value = spec['$schema']
    delete spec['$schema']
    spec['_schema'] = value
  }

  return content
}
