import pino from 'pino'
import expressPino from 'express-pino-logger'

export class PinoExpressLogger {
  #expressPino = null

  /**
   * @constructor
   * @param {Object} [context]
   */
  constructor(context= {}) {
    const defaults = {
      level: context.level || 'info',
      prettyPrint: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss.l'
      }
    };

    this.#expressPino = expressPino({
      logger: pino(defaults),
      serializers: {
        req: (req) => ({
          method: req.method,
          url: req.url,
        }),
        res: (res) => ({
          status: res.statusCode,
        }),
      },
    })
  }

  get expressPino() {
    return this.#expressPino
  }
}
