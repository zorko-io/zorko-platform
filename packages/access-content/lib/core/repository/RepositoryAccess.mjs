/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from '../Access.mjs'

export class RepositoryAccess extends Access {

  /**
   * Returns register details, doesn't changes once created
   * @returns {RepositoryProperties}
   */
  get properties () {
    throw new NotYetImplementedError()
  }

  /**
   * @param {Object} params
   * @param {Object} params.repository
   * @param {String} params.repository.name
   * @param {String} params.repository.owner
   * @param {Object} params.resource
   * @param {String} params.resource.dir
   * @param {String} params.resource.name
   * @param {String} params.resource.mime
   * @param {String} params.resource.permission
   * @param {String} params.resource.preview
   * @param {Object} params.content
   * @return {Promise<Partial<ResourceProperties>>}
   */

  async add(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Move resource from src to dest
   * @param src
   * @param dst
   * @return {Promise<void>}
   */

  async move (src, dst) {
    throw new NotYetImplementedError()
  }


  /**
   * Copy resource from src to dest
   * @param src
   * @param dst
   * @return {Promise<void>}
   */

  async copy (src, dst) {
    throw new NotYetImplementedError()
  }

}