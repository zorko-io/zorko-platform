import {UseCase} from '../core'
import assert from 'assert'

export class UseCaseWithLogger extends UseCase {

  #log = null

  /**
   * Enhance use case with default logging
   * @param {{log: MockLogger, origin: UseCaseWithValidation}} context - use case context
   * @param {UseCase} context.origin - original use case, without validation
   * @param {Logger} context.log - logger
   * @param {String} context.name - use case name
   */

  constructor(context= {}) {
    assert(context.name, 'Should have an use case name defined')
    assert(context.origin, 'Should have an origin defined')
    assert(context.log, 'Should have validator log')
    super(context);

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
