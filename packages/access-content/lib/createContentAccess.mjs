import {MongoContentAccess} from './mongo'

/**
 * Create Content Access factory function
 * @param {Object} options
 * @param {Object} options.doc - raw mongo document
 * @param {Object} deps
 * @param {Object} deps.log
 * @param {Object} deps.db
 *
 * @return {MongoVisualizationContent}
 */

export function createContentAccess (options, deps) {

    return new MongoContentAccess({
        doc: options.doc
    }, deps);
}