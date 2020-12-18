import {UseCase} from '../core'
import {createValidator} from '@zorko-io/util-validation'
import assert from 'assert'

export class UseCaseWithValidation extends UseCase {

  /**
   * @type {Validator|null}
   */

  #validator = null

  /**
   * Enhance use case with input validation check
   * @param {Object} context - use case context
   * @param {UseCase} context.origin - original use case, without validation
   * @param {Function} context.createValidator - validator factory function
   */

  constructor(context = {
    createValidator
  }) {
    assert(context.origin, 'Should have an origin defined')
    assert(context.createValidator, 'Should have validator creator defined')

    super(context);
  }

  async run(params) {
    const { origin } = this.context
    const rules = await origin.rules(params)

    if (rules) {
      const {error, result} = await this._validate(params, rules)

      if (!error){
        return origin.run(result)
      }

      throw error
    }

    return origin.run(params)
  }

  async _validate(params, rules) {
     if (!this.#validator)  {
       // TODO: gh-55 - it will cause a bug within dynamyc validation rules
       this.#validator = this.context.createValidator(rules)
     }

     return this.#validator.parse(params)
  }
}
