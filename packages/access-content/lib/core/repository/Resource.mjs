import {join} from 'path'

/**
 * @typedef ResourceProperties
 * @property {String} id
 * @property {String} parent
 * @property {String} name
 * @property {String} content
 * @property {String} mime
 * @property {String} preview
 * @property {String} permission
 */


/**
 * @implements ResourceProperties
 */

export class Resource {

  #id = null
  #name = null
  #parent = null
  #mime = null
  #preview = null
  #permission = null

  constructor({id, name, parent, mime, preview, permission} = {}) {
    this.#id = id
    this.#name= name
    this.#parent = parent
    this.#mime = mime
    this.#preview = preview
    this.#permission = permission
  }

  get id () {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get path () {
    return join(this.#parent, this.#name)
  }

  get parent () {
    return this.#parent
  }

  get mime () {
    return this.#mime
  }

  get preview() {
    return this.#preview
  }

  get permission() {
    return this.#permission
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      parent: this.#parent,
      path: this.path,
      mime: this.#mime,
      preview: this.#preview,
      permission: this.#permission
    }
  }

}