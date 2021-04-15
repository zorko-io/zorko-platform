import assert from 'assert'
import {Query} from '../../core'

export class MongoQuery extends Query {

  #collection = null

  constructor({ query } = {}, {collection} = {}) {
    assert(query, 'should have a #query')
    assert(collection, 'should have a #collection')

    super(query);

    this.#collection = collection
  }

  toCursor() {
    return this.#collection
      .find({})
      .limit(this.limit)
      .skip(this.offset)
  }

}