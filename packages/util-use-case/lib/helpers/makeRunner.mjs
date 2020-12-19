/**
 * Create a function to wrap execution of use case
 */
import {createUseCase} from './createUseCase'
import {MockLogger} from '@zorko-io/util-logger'
import {createValidator} from '@zorko-io/util-validation'

function toUseCaseParams() {
  return null
}

function toUseCaseContext() {
  return null
}

function mapResultToHttp(data) {
  return {...data}
}

function mapErrorToHttp(error, deps) {
  return error
}

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

export function makeRunner(useCaseClass, deps = {
  create: createUseCase,
  toParams: toUseCaseParams,
  toContext: toUseCaseContext,
  validate: createValidator,
  handleResult: mapResultToHttp,
  handleError: mapErrorToHttp,
  log: new MockLogger()
}) {
  return async function useCaseRunner(...args) {

    try {
      const {create, toContext, toParams, log, validate, handleResult} = deps
      const context = toContext(...args)
      const useCase = create(useCaseClass, context, {
        log,
        createValidator: validate
      })

      const params = toParams(...args)

      const result = await useCase.run(params)
      handleResult(result, ...args)
    } catch (error) {
      deps.handleError(error, ...args, {log: deps.log})
    }
  }
}
