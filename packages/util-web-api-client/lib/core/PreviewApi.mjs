/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class PreviewApi {
  /**
   * Get specific preview
   * @param {string} uid - preview unique identifier
   * @returns {Promise<PreviewResponse>}
   */
  async getByUid(uid) {
    throw new NotYetImplementedError()
  }

  /**
   * Get all previews
   * @returns {Promise<PreviewResponse>}
   */
  async getAll() {
    throw new NotYetImplementedError()
  }
}
