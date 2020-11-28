import LIVR from 'livr'
import assert from 'assert'
import {Validator} from '../core'
import {LivrValidationOutput} from './LivrValidationOutput'

/**
 *  Validator with LIVR rules declaration
 */

export class LivrValidator extends Validator {
  #original = null

  constructor(rules) {
    assert(rules)

    super()

    this.#original = new LIVR.Validator(rules)
  }

  async parse(params) {
    const result = this.#original.validate(params)
    const errors = this.#original.getErrors()

    return new LivrValidationOutput(
      result,
      errors
    )
  }
}
