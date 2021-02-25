import {NotYetImplementedError} from '@zorko-io/util-error/lib/index.mjs'

export class ConfigSchema {

  get structure () {
    throw new NotYetImplementedError()
  }


  get validation () {
    throw new NotYetImplementedError()
  }

}





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