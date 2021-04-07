/**
 * @typedef RegisterRecordProperties
 * @property {String} id
 * @property {String} owner
 * @property {String} name
 *
 */

/**
 * @implements RegisterRecordProperties
 */

export class RegisterRecordModel {

  #id = null
  #owner = null
  #name = null

  constructor({id, owner, name} = {}) {
    this.#id = id
    this.#owner = owner
    this.#name = name
  }

  /**
   * Uniq repository ID
   * @return {String}
   */

  get id() {
    return this.#id
  }

  get owner () {
    return this.#owner
  }

  get name () {
    return this.#name
  }

  toJSON() {
    return {
      name: this.#name,
      owner: this.#owner,
      id: this.#id
    }
  }

}