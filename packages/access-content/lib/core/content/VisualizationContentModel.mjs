import _ from 'lodash'

// TODO: 'access-content' - to replace to generic content

/**
 * @typedef VisualizationProperties
 * @property {String} id
 * @property {String} spec
 * @property {String} type
 * @property {Object} parametrization - probably not need, just
 * @property {String} dataReferenceId
 * @property {String} themeReferenceId
 *
 */

/**
 * @implements VisualizationProperties
 */

export class VisualizationContentModel {

  #id = null
  #content = null
  #mime = null
  #config = null

  constructor({id, content, mime, config} = {}) {
    this.#id = id
    this.#content = content
    this.#mime = mime
    this.#config = config
  }

  /**
   * Uniq ID
   * @return {String}
   */
  get id () {
    return this.#id
  }

  /**
   * Actual content here
   * @return {Object}
   */

  get content() {
    return this.#content
  }

  /**
   * Content's mime type
   * @return {String}
   */

  get mime () {
    return this.#mime
  }

  /**
   * Configuration Map
   * @return {Object}
   */
  get config() {
    return this.#config
  }

  /**
   * @return {Partial<ContentProperties>}
   */

  toJSON() {
    return  _.pickBy({
      id: this.id,
      content: this.content,
      mime: this.mime,
      config: this.config
    }, (value) => !_.isUndefined(value))
  }

}