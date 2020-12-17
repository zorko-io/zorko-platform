/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class UseCase {

  /**
   * Triggers use case's business logic
   * @param {Object} params - input parameters to execute a use case
   * @returns {Promise<*>} - result of use case
   */

   async run(params) {
     throw new NotYetImplementedError()
  }

}
