/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * Validator, parse passed parameters, can fill defaults and
 * raise errors if params not feet to validation rules.
 * It's an agnostic to validation rules, so subclasses can
 * choose what validation engine/rules to use  for declaration
 */

export class Validator {
  /**
   * Parse and validate input params
   * @param {Object} params - value to validate
   * @return {Promise<ValidationResult>} - returns params and error if any
   */

  validate(params) {
    throw new NotYetImplementedError()
  }
}
