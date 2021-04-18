/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class AccessContentFacade {

  /**
   * @return {RegisterAccess}
   */
  get register () {
    throw new NotYetImplementedError()
  }

  // TODO: probably it's to generic we may need to branch specific content...
  // like
  //  - facade.visualization,
  //  - facade.dataReference,
  //  - facade.contentReference
  //  - facade.theme,
  //  - facade.securityKey
  /**
   * @return {ContentAccess}
   */
  get content () {
    throw new NotYetImplementedError()
  }

  /**
   * @return {RepositoryAccess}
   */
  get repository () {
    throw new NotYetImplementedError()
  }

  /**
   * Wrap all access resources with audit/logging capabilities
   * @param {Object} options - audit options
   * @params {String} options.traceId - trace id
   * @return {AccessContentFacade}
   */

  withAudit(options) {
    throw new NotYetImplementedError()
  }

  /**
   *  Limit access to a content according to provided user context
   *  @param {Object} context - user context
   *  @return {AccessContentFacade}
   */

  limitAccess(context){
    throw new NotYetImplementedError()
  }

  /**
   * Dealocate all resources, close connections etc
   * @return {Promise<void>}
   */

  async shutDown() {
    throw new NotYetImplementedError()
  }

}