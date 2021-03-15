/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * @implements ResourceProperties
 */

export class Resource {

  /**
   * Returns spaces details, doesn't changes once created
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

  /**
   * @returns {Content}
   */

  open () {
    throw new NotYetImplementedError()
  }

}