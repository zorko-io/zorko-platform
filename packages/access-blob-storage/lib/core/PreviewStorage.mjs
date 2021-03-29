/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class PreviewStorage {
  /**
   * @typedef {Object} BlobParams
   * @property {String} name - image name
   * @property {String} data - base64 data
   */

  /**
   * Save image
   * @param {BlobParams} params - params to save
   * @returns {Promise<>}
   */
  async save(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Read image
   * @param {BlobParams} params - params to save
   * @returns {Promise<string>}
   */
  async read(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Remove image in storage
   * @param {BlobParams} params - params to save
   * @returns {Promise<string>}
   */
  async remove(params) {
    throw new NotYetImplementedError()
  }
}
