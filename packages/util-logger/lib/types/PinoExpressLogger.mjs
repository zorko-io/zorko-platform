import expressPino from 'express-pino-logger'

export class PinoExpressLogger {
  #expressPino = null

  constructor(context) {
    this.#expressPino = expressPino({
      serializers: {
        req: (req) => ({
          method: req.method,
          url: req.url,
          user: req.raw.user,
        }),
      },
    })
  }

  get expressPino() {
    return this.#expressPino
  }
}
