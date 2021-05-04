/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from '../Access.mjs'

export class RepositoryAccess extends Access {

  /**
   * Create new resource
   * @param {Object} params
   * @param {ResourceUriProperties} params.folder - uri of the folder to add resource
   * @param {Object} params.resource
   * @param {String} params.resource.name - name of the resource
   * @param {String} params.resource.mime - mime type of the resource
   * @param {String} params.resource.permission - resource permissions
   * @param {String} params.resource.preview - url to resource preview
   * @param {Object} params.content - resource content
   * @return {Promise<Partial<ResourceProperties>>}
   */

  async add(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Get resource properties, it doesn't return content
   * @param {Object} params
   * @param {ResourceUriProperties} params.uri - resource uri
   * @return {Promise<ResourceProperties>}
   */

  get(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Remove resource from repository
   * @param {Object} params
   * @param {ResourceUriProperties} params.uri  - resource uri
   * @return {Promise<void>}
   */

  remove(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Get a list of resources in provided absolute path
   * @param {Object} params
   * @param {ResourceUriProperties} params.folder - absolute path to resource
   * @param {Number} [params.limit]
   * @param {Number} [params.offset]
   * @param {Object} [params.filter]
   * @param {String} [params.filter.mime] - mime of resource
   * @param {String} [params.filter.permission] - permission of resource
   * @return {AsyncIterable}
   */

  list (params) {
    throw new NotYetImplementedError()
  }

  /**
   * Move resource from src to dest
   * @param src
   * @param dst
   * @return {Promise<void>}
   */

  async move (src, dst) {
    throw new NotYetImplementedError()
  }


  /**
   * Copy resource from src to dest
   * @param src
   * @param dst
   * @return {Promise<void>}
   */

  async copy (src, dst) {
    throw new NotYetImplementedError()
  }

  /**
   * Makes new folder
   * @param params
   * @return {Promise<void>}
   */

  async makeFolder (path) {
    throw new NotYetImplementedError()
  }

}