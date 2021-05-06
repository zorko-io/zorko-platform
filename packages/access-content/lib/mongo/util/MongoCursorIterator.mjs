import assert from 'assert'
import {wrapMongoError} from './wrapMongoError.mjs'

export class MongoCursorIterator {
  #cursor = null
  #wrapValue = null

  constructor(context = {}, deps = {}) {

    assert(context.cursor, 'should have #cursor')

    this.#cursor = context.cursor
    this.#wrapValue = deps.wrapValue
  }

  async next() {
    const cursor = this.#cursor

    const done = cursor.isClosed() || !await cursor.hasNext()

    if (done) {
      await cursor.close()
      return {
        done
      }
    }

    const doc = await cursor.next()


    const value = this.#wrapValue ? this.#wrapValue(doc) : doc

    return {
      value
    }
  }

}