/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'
import assert from 'assert'

/**
 *  Core UseCase, designed for encapsulation of
 *  business logic in your project
 */

export class UseCase {

  static rules = null

  #context = null

  /**
   * @constructor
   * @param {C} context - context for the use case
   */

  constructor(context = {}) {
    assert(context, 'UseCase should have a context defined')
    this.#context = context
  }

  /**
   * Returns use case context, used to store dynamic dependencies and
   * config options, aka snapshot from constructor params
   * @type {C}
   */

  get context() {
    return this.#context
  }

  /**
   * Returns dynamic rules for input validation,
   * exact rules maybe generated based on input params
   * @params {Object|null} params - input parameters to validate
   * @return {Object|null} rules - return rules,
   * concrete rules depends from validation engine used in project
   */

  async rules(params = null) {
    return null
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
