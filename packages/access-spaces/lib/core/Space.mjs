/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from './Access'

export class Space extends Access {

  /**
   * Returns register details, doesn't changes once created
   * @returns {SpaceProperties}
   */
  get properties () {
    throw new NotYetImplementedError()
  }

  /**
   * @param {Object} params
   * @param {String} params.path
   * @param {String} params.name
   * @param {Object} params.content
   * @param {String} [params.mime]
   * @param {String} [params.permission]
   * @param {String} [params.preview]
   * @return {Promise<Resource>}
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