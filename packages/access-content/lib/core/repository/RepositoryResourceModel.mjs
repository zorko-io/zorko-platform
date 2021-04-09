/**
 * @typedef RepositoryResourceProperties
 * @property {String} id
 * @property {String} name
 * @property {String} content
 * @property {String} mime
 * @property {String} preview
 * @property {String} permission
 */

/**
 * @implements RepositoryResourceProperties
 */

export class RepositoryResourceModel {

  #id = null
  #name = null
  #path = null
  #content = null
  #mime = null
  #preview = null

  constructor({id, name, path, content, mime, preview} = {}) {
    this.#id = id
    this.#name= name
    this.#path = path
    this.#content = content
    this.#mime = mime
    this.#preview = preview
  }

  get id () {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get path () {
    return this.#path
  }

  get content() {
    return this.#content
  }

  get mime () {
    return this.#mime
  }

  get preview() {
    return this.#preview
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      path: this.#path,
      content: this.#content,
      mime: this.#mime,
      preview: this.#preview
    }
  }

}