import {ContentModel} from '../../core/content/ContentModel.mjs'

export class MongoContentProperties extends ContentModel {


  constructor(result) {
    const doc = result.ops.pop()

    super(
      doc._id.toString(),
      doc.content,
      doc.mime,
      doc.config
    )
  }

}