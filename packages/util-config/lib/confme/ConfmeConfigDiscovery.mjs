import confme_ from 'confme'
import {ConfigDiscovery} from '../core/index.mjs'
import {ConfmeConfigSchema} from './ConfmeConfigSchema.mjs'

export class ConfmeConfigDiscovery extends ConfigDiscovery {
  #context = null
  #confme = null

  /**
   * @param {ConfmeContext} context
   */
  constructor(context = {}, deps = {confme: confme_}) {
    super()
    this.#context = context
    this.#confme = deps.confme
  }

  get schema() {
    return new ConfmeConfigSchema(this.#context);
  }

  discover() {
    return this.#confme(
      this.#context.definition,
      this.#context.validation
    )
  }
}