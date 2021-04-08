import {RepositoryResourceModel} from '../../core'

export class MongoRepositoryResourceModel extends RepositoryResourceModel {

  constructor(result={}) {
    const doc = result.ops.pop()

    super(
      doc._id.toString(),
      doc.name,
      `${doc.parent}${doc.name}`,
      doc.content,
      doc.mime,
      doc.preview
    )
  }

}