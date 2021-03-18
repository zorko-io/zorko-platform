/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * Common props for all content items
 */

export class ContentItem {

  get properties () {
    throw new NotYetImplementedError()
  }

  /**
   *
   * @param {PropertiesMap} map
   */

  parametrize (map) {
    throw new NotYetImplementedError()
  }


}