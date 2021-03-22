import {MongoVisualizationContent} from './MongoVisualizationContent'

export function createMongoContent (doc, deps) {

  // if (doc.mime === 'application/json+vega-lite') {
    return new MongoVisualizationContent(doc,deps)
  // }

}