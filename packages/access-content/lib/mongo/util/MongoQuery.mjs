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
    return this.#collection
      .find(this.#toMongoFilter())
      .limit(this.limit)
      .skip(this.offset)
  }

  #toMongoFilter = () => {
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