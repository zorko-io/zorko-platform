import {AsyncIterable} from '@zorko-io/util-lang'

export class QueryResult extends AsyncIterable {

  #fetchTotal = null

  constructor({iterator, fetchTotal} = {}) {
    super(iterator);

    this.#fetchTotal = fetchTotal
  }

  async total () {
    return this.#fetchTotal()
  }

}