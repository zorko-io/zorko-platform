/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * It manages all register allocated by tenants in the system
 */

export class RegisterAccess {

  /**
   * Allocate new space if not exists
   * @param {Object} params
   * @param {String} params.owner -  repository owner
   * @param {String} params.repo - repository name
   * @return {Promise<RegisterRecordProperties>}
   */

  async allocateNewRepo(params) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object} query
   * @param {String} query.owner
   * @throws {NotFoundError}
   * @return {AsyncIterable<Partial<RepositoryProperties>>}
   */

  iterate(query) {
      throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object} params
   * @param {String} params.repo - repository name
   * @param {String} params.owner - repository owner
   * @throws {NotFoundError}
   * @return {Promise<RegisterRecordProperties>}
   */

  async get(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Mark repository record as deleted
   * @param {Object} params
   * @param {String} params.repo - repository name
   * @param {String} params.owner - repository owner
   * @return {Promise<void>}
   */

  async remove(params) {
    throw new NotYetImplementedError()
  }

}