/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * @interface
 */

export class Access {

  get properties () {
    throw new NotYetImplementedError()
  }

  async add () {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Q} query
   * @throws {NotFoundError}
   * @return {AsyncIterable<T>}
   */

  iterate(query) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique  ID
   * @throws {NotFoundError}
   * @return {Promise<Space>}
   */

  async get(id) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique  ID
   * @return {Promise<void>}
   */

  async remove(id) {
    throw new NotYetImplementedError()
  }

}