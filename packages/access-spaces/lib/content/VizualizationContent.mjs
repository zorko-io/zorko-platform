/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Content} from '../core/Content.mjs'

export class VisualizationContent extends Content {


  static mineTypes = ['application/json+vega-lite']

  /**
   * @return {VisualizationProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

}