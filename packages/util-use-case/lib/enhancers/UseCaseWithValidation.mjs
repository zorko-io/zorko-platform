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

    super(context)
  }

  async run(params) {
    const {origin} = this.context

    const rules = await this.rules(params)

    if (rules) {
      const {error, result} = await this.#validate(params, rules)

      if (!error) {
        return origin.run(result)
      }

      throw error
    }

    return origin.run(params)
  }

  async rules(params = null) {
    const {origin} = this.context
    let rules = origin.constructor.rules

    if (!rules) {
      return origin.rules(params)
    }

    return rules
  }

   #validate = async (params, rules) => {
    const validator = this.#createValidator(rules)

    return validator.parse(params)
  }

  #createValidator = (rules) => {
    const hasStaticRules = Boolean(
      this.context.origin.constructor.rules
    )

    if (hasStaticRules && this.#validator) {
      return this.#validator
    }

    const validator = this.context.createValidator(rules)

    if (hasStaticRules){
      this.#validator = validator
    }

    return validator
  }
}
