/**
 * Create a function to wrap execution of use case
 */
import {MockLogger} from '@zorko-io/util-logger'
import {createUseCase as createUseCase_} from './createUseCase'
import {createValidator as createValidator_} from '@zorko-io/util-validation'
import {
  toResult as toResult_,
  toError as toError_
} from '../adapters'

const DEFAULT_OPTIONS = {
  toParams: () => ({}),
  toContext: (req) => {
    const context = req && req.session ? req.session.context : {}
    const traceID = req.id

    return {
      ...context,
      traceID,
    }
  } ,
  toResult: toResult_,
  toError: toError_
}

const DEFAULT_DEPS = {
  log: new MockLogger(),
  createValidator: createValidator_,
  createUseCase: createUseCase_,
  // TODO: move deps custom func to options as toDeps
  provideUseCaseDeps: () => {}
}

/**
 * Returns function with encapsulated use case, ready to run with proper params
 * @params {ObjectConstructor} - class for particular use case, should be a UseCase or it's subclass
 * @params {Object} [options] - function's dependencies
 * @params {Object} [options.toParams] - convert to parameters
 * @params {Object} [options.toContext] - convert context builder function
 * @params {Object} [options.toResult] - convert result
 * @params {Object} [options.toError] - convert error
 * @params {Object} [deps] - function's dependencies
 * @params {Object} [deps.createUseCase] - use case builder function
 * @params {Object} [deps.createValidator] - validator builder function
 * @params {Function} [deps.provideUseCaseDeps] - provide use case dependencies
 * @params {CoreLogger} [deps.log] - core logger
 * @returns {Function} - closure with use case ready to execution
 */

export function makeRunner(useCaseClass, options, deps = {}) {

  options = { ...DEFAULT_OPTIONS, ...options}
  deps = {...DEFAULT_DEPS, ...deps}

  return async function useCaseRunner(...args) {
    const {toContext, toParams, toResult} = options
    let {createUseCase, createValidator, log, provideUseCaseDeps} = deps
    const context = toContext(...args)

    log = log.child({module: 'makeRunner'})

    if (context.traceID) {
      log = log.child({
        traceID: context.traceID
      })
    }

    try {
      const useCase = createUseCase(useCaseClass, context, {
        log,
        createValidator,
        provideUseCaseDeps
      })
      const params = toParams(...args)

      const result = await useCase.run(params)
      return toResult(...[result, ...args])
    } catch (err) {
      options.toError(err, args, {log})
    }
  }
}
