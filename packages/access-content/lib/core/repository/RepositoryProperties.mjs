export class RepositoryProperties {

  #id = null
  #owner = null
  #name = null

  constructor(id, owner, name) {
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

}