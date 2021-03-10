/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error/lib/index.mjs'

export class Spaces {

  /**
   * @param {String} owner
   * @return {Promise<Space>}
   */

  async allocateNewSpace(owner) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object} query
   * @param {String} query.owner
   * @throws {NotFoundError}
   * @return {Promise<Space[]>}
   */

  async findBy(query) {
    throw new NotYetImplementedError()
  }



}