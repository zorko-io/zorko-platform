import {Access} from './Access'
import {NotYetImplementedError} from '@zorko-io/util-error'

export class Resource extends Access {

  /**
   * Returns spaces details, doesn't changes once created
   * @typedef ResourceProperties
   * @property {String} id
   * @property {String} permission
   * @property {String} name
   * @property {String} [preview]
   * @property {Object} content
   *
   *
   * @returns {ResourceProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }


}