import {MongoVisualizationContent} from './mongo/MongoVisualizationContent'

/**
 * Create Content factory function
 * @param {Object} options
 * @param {Object} options.doc - raw mongo document
 * @param {Object} deps
 * @param {Object} deps.log
 * @param {Object} deps.db
 *
 * @return {MongoVisualizationContent}
 */

export function createContent (options, deps) {

    // TODO: check mime type and then create a content
  // if (doc.mime === 'application/json+vega-lite') {
    return new MongoVisualizationContent({
        doc: options.doc
    },deps)
  // }

}