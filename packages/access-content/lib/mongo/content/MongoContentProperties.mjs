import {ContentProperties} from '../../core/content/ContentProperties.mjs'

export class MongoContentProperties extends ContentProperties {

  constructor(result) {
    const doc = result.ops.pop()

    super(
      doc._id.toString(),
      // TODO: convert vega schema to $schema
      doc.content,
      doc.mime,
      doc.config
    )
  }


}