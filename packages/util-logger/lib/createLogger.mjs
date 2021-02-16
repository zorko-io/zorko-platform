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

export function createLogger(options = {}) {
  let {type, shareCreated} = options
  let logger

  type = type || LoggerTypes.Pino
  shareCreated = shareCreated || true

  if (shareCreated) {
    logger = cache[type]
    if (logger) {
      return logger
    }
  }

  if (type === LoggerTypes.Pino) {
    logger = new PinoLogger()
  } else if (type === LoggerTypes.Console) {
    logger = new ConsoleLogger()
  } else if (type === LoggerTypes.Mock) {
    logger = new MockLogger()
  }

  if (shareCreated) {
    cache[type] = logger
  }

  return logger
}
