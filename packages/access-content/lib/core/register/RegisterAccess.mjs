/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from '../Access.mjs'

/**
 * It manages all register allocated by tenants in the system
 */

export class RegisterAccess extends Access {

  /**
   * Allocate new space if not exists
   * @param {String} owner -  space owner
   * @param {String} name - name of space
   * @return {Promise<RegisterRecordProperties>}
   */

  async add(owner, name) {
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
   * @param {String} id - unique Repository ID
   * @throws {NotFoundError}
   * @return {Promise<RegisterRecordProperties>}
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

  /**
   * Import new repository
   * @param {ReadableStream} stream
   */
  ingestContent(scope, stream){
    throw new NotYetImplementedError()
  }

}