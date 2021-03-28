import {Content} from '../core/Content'

// TODO: we probably don't need db specific contents hierarchies
export class MongoVisualizationContent extends Content {

  #doc = null
  #deps = null

  constructor(context = {}, deps) {
    super()

    this.#doc = context.doc
    this.#deps = deps
  }


  get properties() {

    return {
      id: this.#doc._id.toString(),
      spec: this.#doc.spec,
      resource: this.#doc.resource
    }
  }
}