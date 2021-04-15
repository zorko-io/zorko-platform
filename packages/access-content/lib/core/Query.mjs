export class Query {
  #select  = null
  #limit  = null
  #offset = null

  constructor({ select, limit, offset } = {}) {
    this.#select = select
    this.#limit  = limit
    this.#offset = offset
  }

  get select () {
    return this.#select
  }

  get limit () {
    return this.#limit
  }

  get offset()  {
    return this.#offset
  }
}