import {UseCase} from '../core'
import {createValidator} from '@zorko-io/util-validation'
import assert from 'assert'

export class UseCaseWithValidation extends UseCase {

  /**
   * Enhance
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
    return this.context.origin.run(params)
  }
}
