/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'
import assert from 'assert'

/**
 *  Core UseCase, designed for encapsulation of
 *  various business logic
 */

export class UseCase {

  #context = null

  /**
   * Makes sure that context is defined and attach it
   * to the instance
   * @param {C} context - context for the use case
   */

  constructor(context = {}) {
    assert(context, 'UseCase should have a context defined')
    this.#context = context
  }

  /**
   * Use case context, used to store dynamic dependencies and
   * config options, aka snapshot from constructor params
   * @type {C}
   */

  get context() {
    return this.#context
  }

  /**
   * Triggers use case's business logic
   * @param {Object} params - input parameters to execute a use case
   * @returns {Promise<*>} - result of use case
   */

  async run(params) {
    throw new NotYetImplementedError()
  }

}
