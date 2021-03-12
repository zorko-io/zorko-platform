import {NotYetImplementedError} from '@zorko-io/util-error/lib/index.mjs'

export class PromisifyIterator {

  /**
   * @return {Promise<Boolean>}
   */

  async hasNext() {
    throw new NotYetImplementedError()
  }

  /**
   * @return {Promise<Object>}
   */

  async next () {
    throw new NotYetImplementedError()
  }

  async close () {
    throw new NotYetImplementedError()
  }

}