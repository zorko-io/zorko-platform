/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Content} from './Content'

export class DataReference extends Content{

  /**
   * @return {DataReferenceProperties}
   */

  get properties () {
    throw new NotYetImplementedError()
  }

}