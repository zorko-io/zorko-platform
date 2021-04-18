/* eslint-disable no-unused-vars */
import {Access} from '../Access'

/**
 * Common props for all content
 */

export class ContentAccess extends Access {

  /**
   * Add new content to repository
   * @param {Object} params - add new content params
   * @param {Object} params.content - payload of content
   * @param {String} params.content.mime - mime type
   * @param {String} params.content.content - actual content
   * @param {String|undefined} params.content.config - configuration for parameterization
   * @return {Promise<ContentProperties>}
   */

  async add(params) {
    super.add(params);
  }

  /**
   * @param {Object} query - content query object
   * @param {Array} query.select - list of content fields
   * @param {Number} [query.limit]=10 - limit result set
   * @param {Number} [query.offset]=0 - offset for result set
   */
  iterate(query) {
    return super.iterate(query);
  }

  /**
   * Get content by uniq ids
   * @param {Object} params
   * @param {String} params.repository - content's repository
   * @param {String} params.owner - owner of repository
   * @param {String} params.id - id for content
   * @return {Promise<ContentProperties>}
   */

  async get(params) {
    super.get(params);
  }

  /**
   * Remove content by uniq ids
   * @param {Object} params
   * @param {String} params.repository - content's repository
   * @param {String} params.owner - owner of repository
   * @param {String} params.id - id for content
   * @return {Promise<void>}
   */

  async remove(params) {
    super.remove(params);
  }
}