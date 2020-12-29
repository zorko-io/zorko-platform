import {UseCase} from '../core'
import assert from 'assert'

export class UseCaseWithLogger extends UseCase {

  /**
   * @type {CoreLogger}
   */

  #log = null

  // TODO: UseCaseWithLogger - check constructor asserts
  // add unit tests to check constructor asserts
  // label: tech-dept

  /**
   * Enhance use case with logging
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

    this.#log = context.log.child({useCase: context.name})
  }

  async run(params) {
    const log = this.#log

    log.trace('Start use case execution')

    // TODO: UseCaseWithLogger - Measure execution time
    // - use json payload
    // - pass params and results to logger,
    // - handle error scenario (try/catch)
    // - cover with unit tests
    // label: tech-dept

    try {
      const result = await this.context.origin.run(params);

      log.info('Finish use case execution')

      return result

    } catch (error){
      log.error('Issues with running use case')

      throw error
    }
  }
}
