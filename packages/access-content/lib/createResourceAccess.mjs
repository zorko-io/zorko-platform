import {MongoResourceAccess} from './mongo'

/**
 * Create Resource Access factory function
 * @param {Object} options
 * @param {Object} options.doc - raw mongo document
 * @param {Object} deps
 * @param {Object} deps.log
 * @param {Object} deps.db
 *
 * @return {ResourceAccess}
 */

export function createResourceAccess(options, deps) {
  return new MongoResourceAccess(
    {
      doc: options.doc,
    },
    deps
  )
}
