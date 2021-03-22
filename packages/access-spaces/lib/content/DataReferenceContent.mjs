/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Content} from '../core/Content.mjs'

export class DataReferenceContent extends Content {

  static mineTypes = ['application/json+data-reference']

  /**
   * @return {DataReferenceProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

}