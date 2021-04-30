/**
 * @typedef ResourceUriProperties
 * @property {String} repo - repository name
 * @property {String} owner - owner name
 * @property {String} path - path to the resource
 * @property {String} name - name of the resource
 */


/**
 * @implements ResourceUriProperties
 */

export class ResourceUri {

  #repo = null
  #owner = null
  #path = null
  #name = null


  constructor({ repo, owner, path, name }) {
    this.#repo = repo
    this.#owner = owner
    this.#path = path
    this.#name = name

  }

  get repo () {
    return this.#repo
  }

  get owner () {
    return this.#owner
  }

  get path () {
    return this.#path
  }

  get name () {
    return this.#name
  }

  toString() {
    return `${this.owner}/${this.repo}${this.path}`
  }

  toJSON() {
    return {
      repo: this.repo,
      owner: this.owner,
      path: this.path,
      name: this.name
    }
  }

}


