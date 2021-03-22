/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * It manages all register allocated by tenants in the system
 */

export class SpaceRegister {

  /**
   * Allocate new space if not exists
   * @param {String} owner -  space owner
   * @param {String} name - name of space
   * @return {Promise<Space>}
   */

  async add(owner, name) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {Object} query
   * @param {String} query.owner
   * @throws {NotFoundError}
   * @return {AsyncIterable<Space>}
   */

  iterate(query) {
      throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique space ID
   * @throws {NotFoundError}
   * @return {Promise<Space>}
   */

  async get(id) {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {String} id - unique space ID
   * @return {Promise<void>}
   */

  async remove(id) {
    throw new NotYetImplementedError()
  }


  /**
   * Allocate content search session
   * @param {Object} scope - specify spaces to search over
   * @return {@return Promise{ContentSearch}}
   */

   startContentSearch(scope) {
    throw new NotYetImplementedError()
  }

}