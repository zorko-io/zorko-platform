import {MockLogger} from '@zorko-io/util-logger'
import {ValidationError} from '@zorko-io/util-error'

/**
 * Passes result to response as json,
 * @param {Error}error - error to convert
 * @param {Object[]} args - arguments from express middleware like [req, res, next]
 * @param {Object} [deps] - dependencies
 * @param {CoreLogger} [deps.log] - logger instance
 * @return {*} - converted result, the same what we send over response
 */

export function toError(error, args, deps = {log: new MockLogger()}) {
  const [req, res] = args
  const log = deps.log

  if (error instanceof ValidationError) {
    error = error.toJSON()

    log.info({
      error
    })

    res.send({
      status: 0,
      error
    })
  } else {

    log.fatal({
      REQUEST_URL: req.url,
      REQUEST_PARAMS: req.params,
      REQUEST_BODY: req.body,
      ERROR_STACK: error.stack,
    })

    res.send({
      status: 0,
      error: {
        name: 'ServerError',
        message: 'Please, contact your system administrator!',
      },
    })
  }
}
