import _ from 'lodash'
import {toObjectId} from '../util'
import {ContentModel} from '../../core/content/ContentModel.mjs'

export class MongoContentModel extends ContentModel {

  static schema = {}

  static encodeSpecialCharters = (content) => {
    content = _.cloneDeep(content)
    const spec = content.spec

    if (spec) {
      const value = spec['$schema']
      delete spec['$schema']
      spec['_schema'] = value
    }

    return content
  }
  static decodeSpecialCharters = (content) => {
    content = _.cloneDeep(content)
    const spec = content.spec

    if (spec) {
      const value = spec['_schema']
      delete spec['_schema']
      spec['$schema'] = value
    }

    return content
  }

  static toProps = (doc) => {
    return {
      id: doc._id.toString(),
      content: MongoContentModel.decodeSpecialCharters(
        doc.content
      ),
      mime: doc.mime,
      config: doc.config
    }
  }

  constructor(context) {
    let props = context

    if (context.ops) {
      const doc = context.ops.pop()
      props = MongoContentModel.toProps(doc)
    }
    super(props)
  }

  toDocument() {
    let result = {}

    if (this.id){
      result._id = toObjectId(this.id)
    }

    let content = MongoContentModel.encodeSpecialCharters(
      this.content
    )

    return {
      content: content,
      mime: this.mime,
      config: this.config,
      ...result
    }
  }

}