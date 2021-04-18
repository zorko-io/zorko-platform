import assert from 'assert'
import {Query} from '../../core'
import {NotYetImplementedError} from '@zorko-io/util-error'

export class MongoQuery extends Query {
  #collection = null

  constructor({query} = {}, {collection} = {}) {
    assert(query, 'should have a #query')
    assert(collection, 'should have a #collection')

    super(query)

    this.#collection = collection
  }

  toCursor() {
    const pipeline = []

    // if (this.filter.length > 0){
      pipeline.push({$match: this.#toMatchQuery()})
    // }
    pipeline.push({$skip: this.offset})

    pipeline.push({$limit: this.limit})

    return this.#collection.aggregate(pipeline)
  }

  #toMatchQuery = () => {
    return this.filter.reduce((memo, value) => {
      if (value.equal) {
        memo[value.field] = value.equal
      } else {
        throw new NotYetImplementedError('Only #equal operator supported for now')
      }
      return memo
    }, {})
  }
}