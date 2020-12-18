import {UseCase} from '../core'
import assert from 'assert'

export class UseCaseWithLogger extends UseCase {

  /**
   * @type {CoreLogger}
   */

  #log = null

  /**
   * Enhance use case with default logging
   *
   * @typedef UseCaseWithLoggerContext
   * @property {CoreLogger} log - logger
   * @property {UseCase} origin - original use case
   * @property {String} name - original use case's name
   *
   * @param {UseCaseWithLoggerContext} context - use case context
   */

  constructor(context) {
    super(context);

    assert(context.name, 'Should have an use case name defined')
    assert(context.origin, 'Should have an origin defined')
    assert(context.log, 'Should have validator log')

    this.#log = context.log.logger(context.name)
  }

  async run(params) {
    const log = this.#log

    log.trace('Start use case execution')

    const result = await this.context.origin.run(params);

    log.trace('Finish use case execution')


    return result
  }
}
