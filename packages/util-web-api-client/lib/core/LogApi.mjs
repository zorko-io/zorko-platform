/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class LogApi {
  /**
   * @typedef {Array<Object>} Log
   */

  /**
   * Upload logs to the server
   * @param {Array<Object>} logs - the list of logs
   * @returns {Promise<void>}
   */
  async send(logs) {
    throw new NotYetImplementedError()
  }
}
