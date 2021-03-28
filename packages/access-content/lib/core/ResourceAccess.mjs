/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class ResourceAccess {

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
   * @return {AsyncIterable<Partial<RepositoryResourceProperties>>}
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