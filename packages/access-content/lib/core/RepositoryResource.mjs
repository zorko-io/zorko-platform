/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * @implements RepositoryResourceProperties
 */

export class RepositoryResource {

  /**
   * Returns register details, doesn't changes once created
   * @returns {RepositoryResourceProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

  /**
   * Iterate over folder content, if not a folder then throws an exception
   * @param {Object} query
   * @throws {NotFoundError}
   * @return {AsyncIterable<RepositoryResource>}
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