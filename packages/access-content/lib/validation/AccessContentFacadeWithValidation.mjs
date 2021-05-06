import {AccessContentFacade} from '../core/index.mjs'
import assert from 'assert'
import {ContentAccessWithValidation} from './content'
import {RepositoryAccessWithValidation} from './repository'
import {RegisterAccessWithValidation} from './register/index.mjs'

export class AccessContentFacadeWithValidation extends AccessContentFacade{

  #origin = null
  #content = null
  #repository = null
  #register = null

  /**
   *
   * @param {Object} context
   * @param {AccessContentFacade} context.origin
   */

  constructor(context = {}) {
    assert(context.origin, 'should have #origin for decoration')

    super()

    this.#origin = context.origin

    this.#content = new ContentAccessWithValidation({
      origin: this.#origin.content
    })
    this.#repository = new RepositoryAccessWithValidation({
      origin: this.#origin.repository
    })

    this.#register = new RegisterAccessWithValidation({
      origin: this.#origin.register
    })
  }

  get content() {
    return this.#content;
  }

  get register() {
    return this.#register;
  }

  get repository() {
    return this.#repository;
  }

  withAudit(options) {
    return this.#origin.withAudit(options);
  }

  limitAccess(context) {
    return this.#origin.limitAccess(context);
  }

  async shutDown() {
    this.#origin.shutDown();
  }
}