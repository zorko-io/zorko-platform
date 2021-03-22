/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from './Access'

/**
 * It manages all register allocated by tenants in the system
 */

export class RepositoryRegisterAccess extends Access {

  /**
   * Allocate new space if not exists
   * @param {String} owner -  space owner
   * @param {String} name - name of space
   * @return {Promise<RepositoryAccess>}
   */

  async add(owner, name) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object} query
   * @param {String} query.owner
   * @throws {NotFoundError}
   * @return {AsyncIterable<RepositoryAccess>}
   */

  iterate(query) {
      throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique RepositoryAccess ID
   * @throws {NotFoundError}
   * @return {Promise<RepositoryAccess>}
   */

  async get(id) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique Repository ID
   * @return {Promise<void>}
   */

  async remove(id) {
    throw new NotYetImplementedError()
  }


  /**
   * Allocate content search session
   * @param {Object} scope - specify Repository to search over
   * @return Promise{ContentSearch}
   */

   startContentSearch(scope) {
    throw new NotYetImplementedError()
  }

}