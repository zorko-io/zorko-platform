import {ValidationResult} from './core/ValidationResult'
import {ValidationError} from '@zorko-io/util-error'

export class LivrValidationResult extends ValidationResult {

  #errors = null
  #params = null

  /**
   * @param {Object} params - Params after validation
   * @param {Object} errors - LIVR validator errors
   */

  constructor(params, errors) {
    super();

    this.#params = params
    this.#errors = errors
  }


  get params() {
    return this.#params;
  }

  get error() {
    let errors = this.#errors
    return !errors || new ValidationError({errors})
  }
}
