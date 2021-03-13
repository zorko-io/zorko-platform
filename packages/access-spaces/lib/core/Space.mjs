/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class Space {

  /**
   * @typedef SpaceDescription
   * @property {String} id
   * @property {String} owner
   * @property {String} name
   *
   * @return {Promise<SpaceDescription>}
   */
  async describe() {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object} query
   * @throws {NotFoundError}
   * @return {AsyncIterable<Resource>}
   */
  async iterate(query) {
    throw new NotYetImplementedError()
  }

}