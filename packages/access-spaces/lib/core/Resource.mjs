/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * @implements ResourceProperties
 */

export class Resource {

  /**
   * Returns register details, doesn't changes once created
   * @returns {ResourceProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

  /**
   * Iterate over folder content, if not a folder then throws an exception
   * @param {Object} query
   * @throws {NotFoundError}
   * @return {AsyncIterable<Resource>}
   */

  iterate(query) {
    throw new NotYetImplementedError()
  }

  /** Returns content
   * @returns {Content}
   */

  async open () {
    throw new NotYetImplementedError()
  }

}