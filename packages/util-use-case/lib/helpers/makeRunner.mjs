/**
 * Create a function to wrap execution of use case
 */
import {createUseCase} from './createUseCase'
import {MockLogger} from '@zorko-io/util-logger'
import {createValidator} from '@zorko-io/util-validation'
import {
  mapErrorToHttp,
  mapResultToHttp,
  toUseCaseContext,
  toUseCaseParams
} from '../adapters/http'

/**
 * Returns function with encapsulated use case, ready to run with proper params
 * @params {ObjectConstructor} - class for particular use case, should be a UseCase or it's subclass
 * @params {Object} [deps] - function's dependencies
 * @params {Object} [deps.create] - use case builder function
 * @params {Object} [deps.validate] - validator builder function
 * @params {Object} [deps.toParams] - parameters builder function
 * @params {Object} [deps.toContext] - context builder function
 * @params {Object} [deps.handleResult] - handle successful result
 * @params {Object} [deps.handleError] - handle error
 * @params {CoreLogger} [deps.log] - core logger
 * @returns {Function} - closure with use case ready to execution
 */

const DEFAULT_DEPS = {
  create: createUseCase,
  toParams: toUseCaseParams,
  toContext: toUseCaseContext,
  validate: createValidator,
  handleResult: mapResultToHttp,
  handleError: mapErrorToHttp,
  log: new MockLogger()
}


export function makeRunner(useCaseClass, deps) {

  deps = { ...DEFAULT_DEPS, ...deps}

  return async function useCaseRunner(...args) {
    try {
      const {create, toContext, toParams, log, validate, handleResult} = deps
      // TODO: gh-55 provide defaults, separate selector from adapter
      const context = toContext(...args)
      const useCase = create(useCaseClass, context, {
        log,
        createValidator: validate
      })

      // TODO: gh-55 provide defaults, separate selector from adapter
      const params = toParams(...args)

      const result = await useCase.run(params)
      // TODO: gh-55 provide default sucess handling and json serialization
      handleResult(...[result, ...args])
    } catch (error) {
      // TODO: gh-55 provide default error handling and json serialization or errors
      deps.handleError(...[error, ...args, {log: deps.log}])
    }
  }
}
