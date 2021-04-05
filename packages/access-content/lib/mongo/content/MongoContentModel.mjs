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
      content[MongoContentModel.encodeKey(key)] = value
    }
    return content
  }

  static encodeKey = (key) => {
    return key.replaceAll('$', `'$'`)
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

    let doc = MongoContentModel.encodeSpecialCharters(this)

    return {
      ...doc,
      ...result
    }
  }

}