import {UserFacedError} from "./UserFacedError";

export class ValidationError extends UserFacedError {
  #errors = null

  constructor({errors} = {}) {
    super();

    this.#errors = errors
  }

  get errors () {
    return this.#errors
  }

}
