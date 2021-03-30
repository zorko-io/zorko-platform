/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'

/**
 * Limit access to a content according to provided user context
 * @param {*} origin - one of the core access instances
 * @param {Object} context - user context
 */

export function limitAccess(origin, context) {
  // TODO: 'access-content' provide utility to
  // - wire with user context Register/Repository/Resource etc
  // - according to user's context
  // label: tech-debt
  throw new NotYetImplementedError()
}
