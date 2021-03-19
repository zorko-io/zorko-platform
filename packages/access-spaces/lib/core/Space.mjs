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
   *
   * @param {String} path
   * @param {String} name
   * @param {Object} content
   *
   */
  async add(path,name, content) {
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