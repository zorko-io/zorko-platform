export class KnexLogger {

  #origin = null

  constructor(origin) {
    this.#origin = origin

    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)
    this.deprecate = this.deprecate.bind(this)
    this.debug = this.debug.bind(this)
  }

  warn(message) {
    this.#origin.warn.apply(this.#origin, {message})
  }

  error(message) {
    this.#origin.error.apply(this.#origin, {message})
  }

  deprecate(message) {
    this.#origin.warn.apply(this.#origin, {message})
  }

  debug(message) {
    this.#origin.debug.apply(this.#origin, {message})
  }

}