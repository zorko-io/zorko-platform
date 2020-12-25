import {UseCase} from '../core'
import assert from 'assert'

export class UseCaseWithLogger extends UseCase {

  /**
   * @type {CoreLogger}
   */

  #log = null

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

    // TODO: gh-80 measure execution time, pass params and results to logger

    log.trace('Start use case execution')

    try {
      const result = await this.context.origin.run(params);

      log.info('Finish use case execution')

      return result

    } catch (error){
      // TODO:  gh-80 log error for json format

      log.error('Issues with running use case')

      throw error
    }
  }
}
