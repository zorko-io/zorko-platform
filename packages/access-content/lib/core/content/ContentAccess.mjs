/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
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
}