import {createValidator} from '@zorko-io/util-validation'
import {MockLogger} from '@zorko-io/util-logger'
import {UseCaseWithValidation} from '../enhancers'
import {UseCaseWithLogger} from '../enhancers/UseCaseWithLogger.mjs'

/**
 * Creates a use case, it's not only calls new with passed constructor,
 * but doing various enhancements
 * @params {ObjectConstructor} - class for particular use case, should be a UseCase or it's subclass
 * @params {Object} context - use case context
 * @params {Object} deps - function's dependencies
 * @params {Object} [deps.createValidator] - validator factory function
 * @params {CoreLogger} [deps.log] - logger
 * @params {CoreLogger} [deps.provideUseCaseDeps] - provide origin's dependencies
 * @returns {UseCase} - enhanced instance of passed class with various decorators over it
 */

export function createUseCase(useCase, context, deps = {
  createValidator,
  log: new MockLogger(),
  provideUseCaseDeps: () => {}
}){

  const { log, createValidator} = deps

  return new UseCaseWithLogger({
    name: useCase.name,
    origin: new UseCaseWithValidation({
      origin: new useCase(context, {
        log,
        ...deps.provideUseCaseDeps()
      }),
      createValidator
    }),
    log,
  })}
