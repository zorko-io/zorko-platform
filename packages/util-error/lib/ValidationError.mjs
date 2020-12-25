import {UserFacedError} from './UserFacedError'

export class ValidationError extends UserFacedError {
  #errors = null
  #message = ''

  constructor({errors, message} = {}) {
    super()

    this.#message = !message ? this.name : message
    this.#errors = errors
  }

  get errors() {
    return this.#errors
  }

  get message() {
    return this.#message
  }

  toJSON() {
    const original = super.toJSON()

    return {
      ...original,
      errors: this.errors
    }
  }

}
