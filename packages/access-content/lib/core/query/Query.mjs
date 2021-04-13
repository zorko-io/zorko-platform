/**
 * @typedef QueryProperties
 * @property {String[]} select - list of json paths
 * @property {Number} limit
 * @property {Number} offset
 */

/**
 * @implements QueryProperties
 */

export class Query {

  #select = null
  #limit = 10
  #offset = 0

  constructor(context = {}) {
    this.#select = context.select
    this.#limit = context.limit
    this.#offset = context.offset
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

  toJSON() {
    return {

    }
  }

}