import {toObjectId} from '../util'
import {RegisterRecordModel}  from '../../core'

export class MongoRegisterRecordModel extends RegisterRecordModel{

  static schema = {}

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