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

  makeResultsCursor() {
    return this.#collection.aggregate([
      {$match: this.toMatchQuery()},
      {$skip: this.offset},
      {$limit: this.limit}
    ])
  }

  makeTotalCursor () {
    return this.#collection.aggregate([
      {$match: this.toMatchQuery()},
      {$count: 'total'}
    ])
  }

  toMatchQuery = () => {
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