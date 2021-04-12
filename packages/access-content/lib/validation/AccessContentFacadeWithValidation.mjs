import {AccessContentFacade} from '../core/index.mjs'
import assert from 'assert'
import {ContentAccessWithValidation} from './content'

export class AccessContentFacadeWithValidation extends AccessContentFacade{

  #origin = null
  #content = null

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
  }

  get content() {
    return this.#content;
  }

  get register() {
    return this.#origin.register;
  }

  get repository() {
    return this.#origin.repository;
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