/**
 * @typedef QueryProperties
 * @property {String[]} select - list of json paths
 * @property {Number} limit
 * @property {Number} offset
 * @property {Array} filter
 */

/**
 * @implements QueryProperties
 */

export class Query {

  #select = null
  #limit = 10
  #offset = 0
  #filter = []

  constructor({select,limit, offset, filter } = {}) {
    this.#select = select
    this.#limit = limit
    this.#offset = offset
    this.#filter = filter || []
  }

  get select() {
    return this.#select
  }

  get limit () {
    return this.#limit
  }

  get offset () {
    return this.#offset
  }

  get filter () {
    return this.#filter
  }

  toJSON() {
    return {
      select: this.select,
      limit: this.limit,
      offset: this.offset,
      filter: this.filter
    }
  }
}