import {NotYetImplementedError} from '@zorko-io/util-error'


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