/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {ContentItem} from './ContentItem'

export class DataReference extends ContentItem {

  /**
   * @return {DataReferenceProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

}