/**
 * Create a function to wrap execution of use case
 */
import {MockLogger} from '@zorko-io/util-logger'
import {createUseCase as createUseCase_} from './createUseCase'
import {createValidator as createValidator_} from '@zorko-io/util-validation'
import {
  mapErrorToHttp,
  mapResultToHttp
} from '../adapters/http'

/**
 * Returns function with encapsulated use case, ready to run with proper params
 * @params {ObjectConstructor} - class for particular use case, should be a UseCase or it's subclass
 * @params {Object} [options] - function's dependencies
 * @params {Object} [options.toParams] - parameters builder function
 * @params {Object} [options.toContext] - context builder function
 * @params {Object} [options.toResult] - handle successful result
 * @params {Object} [options.handleError] - handle error
 * @params {Object} [deps] - function's dependencies
 * @params {Object} [deps.createUseCase] - use case builder function
 * @params {Object} [deps.createValidator] - validator builder function
 * @params {Function} [deps.provideUseCaseDeps] - provide use case dependencies
 * @params {CoreLogger} [deps.log] - core logger
 * @returns {Function} - closure with use case ready to execution
 */

const DEFAULT_OPTIONS = {
  toParams: () => ({}),
  toContext: (req) => req && req.session ? req.session.context : {},
  toResult: mapResultToHttp,
  handleError: mapErrorToHttp
}

export function makeRunner(useCaseClass, options, deps = {
  log: new MockLogger(),
  createValidator: createValidator_,
  createUseCase: createUseCase_,
  provideUseCaseDeps: () => {}
}) {

  options = { ...DEFAULT_OPTIONS, ...options}

  return async function useCaseRunner(...args) {
    try {
      const {createUseCase, createValidator, log, provideUseCaseDeps} = deps
      const {toContext, toParams, toResult} = options
      const context = toContext(...args)
      const useCase = createUseCase(useCaseClass, context, {
        log,
        createValidator,
        provideUseCaseDeps
      })
      const params = toParams(...args)

      const result = await useCase.run(params)
      // TODO: gh-55 provide default success handling and json serialization
      return toResult(...[result, ...args])
    } catch (error) {
      // TODO: gh-55 provide default error handling and json serialization or errors
      deps.handleError(...[error, ...args, {log: deps.log}])
    }
  }
}
