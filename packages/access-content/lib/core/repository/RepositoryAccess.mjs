/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from '../Access.mjs'

export class RepositoryAccess extends Access {

  /**
   * Create new resource with as content
   * @param {Object} params
   * @param {Object} params.repository
   * @param {String} params.repository.name
   * @param {String} params.repository.owner
   * @param {Object} params.resource
   * @param {String} params.resource.dir
   * @param {String} params.resource.name
   * @param {String} params.resource.mime
   * @param {String} params.resource.permission
   * @param {String} params.resource.preview
   * @param {Object} params.content
   * @return {Promise<Partial<ResourceProperties>>}
   */

  async add(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Get resource properties
   * @param {Object} params
   * @param {Object} params.resource
   * @param {String} params.resource.id - id of resource
   * @param {Object} params.repository
   * @param {String} params.repository.name - name of repository
   * @param {string} params.repository.owner - owner of repository
   * @return {Promise<ResourceProperties>}
   */

  get(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Remove resource from repository
   * @param {Object} params
   * @param {Object} params.resource
   * @param {String} params.resource.id - id of resource
   * @param {Object} params.repository
   * @param {String} params.repository.name - name of repository
   * @param {string} params.repository.owner - owner of repository
   * @return {Promise<void>}
   */

  remove(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Read resource's content as an object
   * @param {Object} params
   * @param {Object} params.resource
   * @param {String} params.resource.id - id of resource
   * @param {Object} params.repository
   * @param {String} params.repository.name - name of repository
   * @param {string} params.repository.owner - owner of repository
   * @return {Promise<Object>}
   */

  read(params) {
    throw new NotYetImplementedError()
  }

  /**
   * Provide a list of resources in provided folder
   * @param {Object} params
   * @param {String} [params.path] - folder path, default 'root'
   * @param {Number} [params.limit]
   * @param {Number} [params.offset]
   * @param {Object} [params.filter]
   * @param {String} params.filter.mime - mime of resource
   * @param {Object} params.filter.permission - permission of resource
   * @param {String} params.repository.name - name of repository
   * @param {string} params.repository.owner - owner of repository
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


}