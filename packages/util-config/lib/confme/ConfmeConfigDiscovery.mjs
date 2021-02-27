import confme from 'confme'
import {ConfigDiscovery} from '../core/index.mjs'
import {ConfmeConfigSchema} from './ConfmeConfigSchema.mjs'

export class ConfmeConfigDiscovery extends ConfigDiscovery {
  #context = null

  /**
   * @param {ConfmeContext} context
   */
  constructor(context = {}) {
    super()
    this.#context = context
  }

  get schema() {
    return new ConfmeConfigSchema(this.#context);
  }

  discover() {
    return confme(
      this.#context.definition,
      this.#context.validation
    )
  }
}