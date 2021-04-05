/**
 * @typedef ContentProperties
 * @property {String} id
 * @property {String} content
 * @property {String} mime
 * @property {String} config
 *
 */

/**
 * @implements ContentProperties
 */

export class ContentModel {

  static rules = {}

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
   * @return {ContentProperties}
   */

  toJSON() {
    return  {
      id: this.#id,
      content: this.#content,
      mime: this.mime,
      config: this.config
    }
  }

}