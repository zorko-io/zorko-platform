import confme from 'confme'
import {ConfigDiscovery} from './ConfigDiscovery.mjs'
import {FsConfigSchema} from './FsConfigSchema.mjs'

export class ConfmeConfigDiscovery extends ConfigDiscovery {
  #definition = '';
  #validation = '';

  /**
   *
   * @param {Object} context
   * @param {String} context.definition - path to confme definition file
   * @param {String} context.validation - path to confme validation file
   */
  constructor(context = {}) {
    super()
    this.#definition = context.definition
    this.#validation= context.validation
  }

  get schema() {
    return new FsConfigSchema({
      definition: this.#definition,
      validation: this.#definition
    });
  }

  discover() {
    return confme(
      this.#definition,
      this.#validation
    )
  }
}