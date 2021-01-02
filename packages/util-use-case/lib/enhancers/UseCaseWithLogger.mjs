import assert from 'assert'
import {UseCase} from '../core'

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
    super(context)

    assert(context.name, 'Should have an use case name defined')
    assert(context.origin, 'Should have an origin defined')
    assert(context.log, 'Should have validator log')

    this.#log = context.log.child({useCase: context.name})
  }

  async run(params) {
    const log = this.#log

    log.trace('Start use case execution')

    const startTime = new Date()
    const payload = {
      useCase: this.context.name,
      params,
    }
    try {
      const result = await this.context.origin.run(params)
      log.info('Finish use case execution')
      log.debug({...payload, result, runtime: new Date().getTime() - startTime})

      return result
    } catch (error) {
      log.error('Issues with running use case')
      log.debug({...payload, error, runtime: new Date().getTime() - startTime})

      throw error
    }
  }
}
