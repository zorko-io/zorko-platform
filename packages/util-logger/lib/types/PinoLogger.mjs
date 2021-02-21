import pino from 'pino'
import {CoreLogger} from '../..'

export class PinoLogger extends CoreLogger {
  #pino = null

  /**
   * @constructor
   * @param {Object} [context]
   * @param {Boolean} [context.isPrettyPrint] - enable/disable human readable output, disable by default
   * @param {Pino} [log] - pino instance usually from `pino.child`
   */

  constructor(context = {}, log) {
    super()

    if (!log) {
      const defaults = {
        redact: {
          paths: [
            'msg.*.data.password',
            'msg.*.data.confirmPassword',
            'msg.*.password',
            'msg.*.confirmPassword',
            'msg.params.token',
            'msg.result.data.jwt',
            'msg.result.jwt',
          ],
          censor: '**SENSITIVE DATA**',
        },
        // TODO: configure log level over env vars
        level: context.level || 'info',
      }

      if (context.isPrettyPrint) {
        defaults.prettyPrint = {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss.l'
        }
      }
      log = pino(defaults)
    }

    this.#pino = log
  }

  info(...args) {
    return this.#pino.info(...args)
  }

  fatal(...args) {
    return this.#pino.fatal(...args)
  }

  trace(...args) {
    return this.#pino.trace(...args)
  }

  debug(...args) {
    return this.#pino.debug(...args)
  }

  warn(...args) {
    return this.#pino.warn(...args)
  }

  error(...args) {
    return this.#pino.error(...args)
  }

  child(...args) {
    const pino = this.#pino.child(...args)
    return new PinoLogger(null, pino)
  }
}
