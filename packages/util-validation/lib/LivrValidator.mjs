import LIVR from 'livr'
import assert from 'assert'
import {ValidationError} from '@zorko-io/util-error'
import {Validator} from './Validator'

/**
 * Just wraps with generic error
 */

export class LivrValidator extends Validator {
  #original = null

  constructor(rules) {
    assert(rules)

    super()

    this.#original = new LIVR.Validator(rules)
  }

  validate(params) {
    const result = this.#original.validate(params)

    if (result) {
      return result
    }

    const errors = this.#original.getErrors()

    throw new ValidationError({
      errors,
    })
  }
}
