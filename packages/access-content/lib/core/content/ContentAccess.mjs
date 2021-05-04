/* eslint-disable no-unused-vars */
import {Access} from '../Access'
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * Keep content and manage it versioning, should provide not
 * only a content retrieval, but navigation over content history
 */

// TODO: gh-242 - rename to include history etc ..

export class ContentAccess extends Access {

  /**
   * Write content by provided uri as object
   * @param {Object} params - add new content params
   * @param {Object} params.content - payload of content
   * @param {ResourceUriProperties} params.uri - uri to resource
   * @return {Promise<void>}
   */

  async writeAsObject(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Read content by uri as object
   * @param {Object} params - add new content params
   * @param {ResourceUriProperties} params.uri - uri to resource
   * @return {Promise<Object>}
   */

  async readAsObject(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Read content's metadata
   * @param {Object} params
   * @param {ResourceUriProperties} params.uri - path to content in repository
   * @return {Promise<Object>}
   */

  async readMetadata(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Remove content by uri
   * @param {Object} params
   * @param {ResourceUriProperties} params.uri - content's repository
   * @return {Promise<void>}
   */

  async removeContent(params) {
    throw new NotYetImplementedError()
  }
}