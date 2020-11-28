/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * Validation output, combine parsed parameters and validation errors
 */

export class ValidationOutput {

  /**
   * Returns validated parameters, if validation fails,
   * then validation parameters are null
   * @return {Object|null}
   */

  get result() {
    throw new NotYetImplementedError()
  }

  /**
   * Returns validation error in case of validation fails,
   * if validation passes then error is null
   * @return {ValidationError|null}
   */

  get error() {
    throw new NotYetImplementedError()
  }

}
