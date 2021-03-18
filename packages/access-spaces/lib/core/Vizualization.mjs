/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {ContentItem} from './ContentItem'

export class Visualization extends ContentItem {

  /**
   * @return {VisualizationProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

}