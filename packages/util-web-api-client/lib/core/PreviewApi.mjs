/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class PreviewApi {
  /**
   * @typedef {Object} Preview
   * @property {String} title - preview title
   * @property {String} previewUrl - preview URL
   * @property {String} contentUrl - content URL
   * @property {String} createAt - ISO 8601 time stamp
   * @property {Object} author - previews author details
   * @property {String} author.login - previews author login
   * @property {String} author.avatarUrl - previews author avatar URL
   */

  /**
   * Search by id for a specific preview
   * @param {String} id - preview unique identifier
   * @returns {Promise<Collection<Preview>>}
   */
  async findById(id) {
    throw new NotYetImplementedError()
  }

  /**
   * Search for previews
   * @param {CommonParams} params - params to search over previews
   * @returns {Promise<Collection<Preview>>}
   */
  async findAll(params) {
    throw new NotYetImplementedError()
  }
}
