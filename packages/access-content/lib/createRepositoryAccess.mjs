import {MongoRepositoryAccess} from './mongo'

/**
 * Create Content Access factory function
 * @param {Object} options
 * @param {Object} options.doc - raw mongo document
 * @param {Object} deps
 * @param {Object} deps.log
 * @param {Object} deps.db
 * @param {Object} deps.createContentAccess
 *
 * @return {RepositoryAccess}
 */

export function createRepositoryAccess (options, deps={}) {

    return new MongoRepositoryAccess(
      options,
      deps
    )
}