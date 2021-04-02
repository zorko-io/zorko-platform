/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class AccessContentFacade {

  /**
   * @return {RegisterAccess}
   */
  get register () {
    throw new NotYetImplementedError()
  }

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

}