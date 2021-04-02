import {RegisterRecordProperties}  from '../../core'

export class MongoRegisterRecordProperties extends RegisterRecordProperties {
  constructor(result) {
    let doc

    if (result.ops){
      doc = result.ops.pop()
    }else {
      doc = result
    }

    super(
      doc._id.toString(),
      doc.owner,
      doc.name
    )
  }
}