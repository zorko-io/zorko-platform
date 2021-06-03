import confme_ from 'confme'
import {ConfigDiscovery} from '../core'
import {ConfmeConfigSchema} from './ConfmeConfigSchema'

export class ConfmeConfigDiscovery extends ConfigDiscovery {
  #context = null
  #confme = null

  /**
   * @param {ConfmeContext} context
   * @param {Object} deps
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