import {toObjectId} from '../util'
import {ContentModel} from '../../core/content/ContentModel.mjs'

export class MongoContentModel extends ContentModel {

  static schema = {}

  static encodeSpecialCharters = (content) => {
    for(let key of Object.keys(content)) {
      let value = content[key]
      if (typeof value === 'object'){
        value = MongoContentModel.encodeSpecialCharters(value)
      }
      let encoded = MongoContentModel.encodeKey(key)

      delete content[key]
      content[encoded] = value
    }
    return content
  }

  static encodeKey = (key) => {
    return key.replace('$',"\\'$\\'")
  }

  static toProps = (doc) => {
    return {
      id: doc._id.toString(),
      content: doc.content,
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

    let content = MongoContentModel.encodeSpecialCharters(this.content)

    return {
      content: content,
      mime: this.mime,
      config: this.config,
      ...result
    }
  }

}