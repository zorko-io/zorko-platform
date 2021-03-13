/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class Space {

  /**
   * Returns spaces details, doesn't changes once created
   * @typedef SpaceProperties
   * @property {String} id
   * @property {String} owner
   * @property {String} name
   *
   * @returns {SpaceProperties}
   */
  get properties () {
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