/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error/lib/index.mjs'

export class Spaces {

  /**
   * @param {String} owner
   * @return {Promise<Space>}
   */

  async allocateSpaceIfNotExists(owner) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object} query
   * @param {String} query.owner
   * @throws {NotFoundError}
   * @return {PromisifyIterator<Space>}
   */

   iterate(query) {
      throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique space ID
   * @throws {NotFoundError}
   * @return {Promise<Space>}
   */

  async get(id) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique space ID
   * @return {Promise<void>}
   */

  async remove(id) {
    throw new NotYetImplementedError()
  }

}