/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error/lib/index.mjs'


export class ConfigDiscovery {

  /**
   * @return {ConfigSchema}
   */

  get schema () {
     throw new NotYetImplementedError()
  }

  /**
   * Search and return configuration
   * @return {Object|null} - config
   */

  discover () {
    throw new NotYetImplementedError()
  }

}