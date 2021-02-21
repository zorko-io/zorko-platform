/**
 * Create logger
 * @param {Object} options - options for create
 * @param {Boolean} [options.shareCreated=true] - create logger once
 * @param {String} [options.preferred='PINO'] - preferred logger type
 */
import {ConsoleLogger, MockLogger, PinoLogger} from './types'

export const LoggerTypes = {
  Pino: 'PINO',
  Console: 'CONSOLE',
  Mock: 'MOCK',
}

const cache = {}

/**
 * Creates Logger
 * @param {Object} options
 * @param {<LoggerTypes>} [options.type] - logger type, PINO by default
 * @param {Boolean} [options.isPrettyPrint] - turn on/off pretty print
 * @param {Boolean} [options.shared] - create a shared, singleton instance, true by default
 * @param {Object} [options.context] - contain logger context
 * @returns {PinoLogger|MockLogger|ConsoleLogger|*}
 */

export function createLogger(
  options = {
    isPrettyPrint: false,
    type: LoggerTypes.Pino,
    shared: true,
    context: {},
  }
) {
  let {type, shared, context} = options
  let logger

  type = type || LoggerTypes.Pino
  shared = shared || true

  if (shared) {
    logger = cache[type]
    if (logger) {
      return logger
    }
  }

  if (type === LoggerTypes.Pino) {
    logger = new PinoLogger({
      isPrettyPrint: options.isPrettyPrint,
      ...context,
    })
  } else if (type === LoggerTypes.Console) {
    logger = new ConsoleLogger()
  } else if (type === LoggerTypes.Mock) {
    logger = new MockLogger()
  }

  if (shared) {
    cache[type] = logger
  }

  return logger
}
