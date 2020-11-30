import {ValidationOutput} from '../core'
import {ValidationError} from '@zorko-io/util-error'

export class LivrValidationOutput extends ValidationOutput {

  #error = null
  #result = null

  /**
   * @param {Object} result - validation result
   * @param {Object} errors - LIVR validator errors
   */

  constructor(result, errors) {
    super()

    this.#error = errors ? new ValidationError({
      errors,
      message: `ValidationError: ${JSON.stringify(errors)}`
    }) : null

    this.#result = !errors && result ? result : false
  }

  get result() {
    return this.#result
  }

  get error() {
    return this.#error
  }
}
