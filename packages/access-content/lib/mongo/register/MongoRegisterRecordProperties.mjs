import {RegisterRecordProperties}  from '../../core'

export class MongoRegisterRecordProperties extends RegisterRecordProperties {
  constructor(result) {
    const doc = result.ops.pop()
    super(
      doc._id.toString(),
      doc.owner,
      doc.name
    )
  }
}