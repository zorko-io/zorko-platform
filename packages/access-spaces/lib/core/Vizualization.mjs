/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Content} from './Content'

export class Visualization extends Content {

  /**
   * @return {VisualizationProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

}