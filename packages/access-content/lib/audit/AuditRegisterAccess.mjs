import assert from 'assert'
import {Access} from '../core'

// TODO: 'access-content' provide an audit layer before integration
export class AuditRegisterAccess extends Access {

  #origin = null
  #log = null

  constructor(context = {}, deps = {}) {
    super()

    assert(context.origin)
    assert(deps.log)

    this.#origin =  context.origin
    this.#log = deps.log.child({class: this.constructor.name})
  }

  get properties() {
    return this.#origin.properties
  }

  async add(...args) {
      return this.#origin.add.apply(this.#origin, args)
  }

  iterate(...args) {
    return this.#origin.iterate.apply(this.#origin, args)
  }

  async get(...args) {
    return this.#origin.get.apply(this.#origin, args)
  }

  async remove(...args) {
    return this.#origin.remove.apply(this.#origin, args)
  }
}