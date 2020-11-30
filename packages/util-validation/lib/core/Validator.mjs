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
   * Asynchronously parse and validate input params, fill with defaults if needed
   * @param {Object} params - input value to validate
   * @return {Promise<ValidationOutput>} - params and error if any
   */

  async parse(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Synchronously parse and validate input params, fill with defaults if needed
   * @param {Object} params - input value to validate
   * @return {ValidationOutput} - params and error if any
   */

  parseSync(params){
    throw new NotYetImplementedError()
  }
}
