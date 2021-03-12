import assert from 'assert'
import {PromisifyIterator} from '../core'

export class MongoSpacesPromisifyIterator extends PromisifyIterator {
  #cursor = null
  #log = null
  #createSpace = null

  constructor(context = {}, deps = {}) {
    super()

    assert(context.cursor)
    assert(deps.log)

    this.#cursor = context.cursor
    this.#log = deps.log
    this.#createSpace = deps.createSpace
  }

  async hasNext() {
    return await this.#cursor.hasNext()
  }

  async next() {
    const result = await this.#cursor.next();

    // TODO: replace with mongo implementation

    return this.#createSpace(result)

  }

  async close() {
    await this.#cursor.close();
  }
}