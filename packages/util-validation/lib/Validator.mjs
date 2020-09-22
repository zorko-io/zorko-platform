/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from "@zorko-io/util-error";

/**
 * Generic validator, to work with core validation error
 */

export class Validator {

  /**
   * Parse and validate input params
   * @param {*} params - params for validation
   * @throws {ValidationError} - if not follow rules
   * @return {Promise<*>} - returns valid params
   */

  validate(params) {
    throw new NotYetImplementedError()
  }

}
