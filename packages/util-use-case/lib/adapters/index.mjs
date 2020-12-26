/**
 * Passes result to response as json,
 * @param result - use case result to convert
 * @param {Express.Request} req - request
 * @param {Express.Response} res - response
 * @param {Object} [deps] - dependencies
 * @return {*} - converted result, the same what we send over response
 */
import {MockLogger} from '@zorko-io/util-logger'
import {ValidationError} from '@zorko-io/util-error'

// eslint-disable-next-line no-unused-vars
export function toResult(result, req, res, deps= {}) {
  // TODO: gh-80 sends as json, or streaming
  result.status = 1

  res.send(result)

  return result;
}

/**
 * Passes result to response as json,
 * @param {Error}error - error to convert
 * @param {Express.Request} req - request
 * @param {Express.Response} res - response
 * @param {Object} [deps] - dependencies
 * @param {CoreLogger} [deps.log] - logger instance
 * @return {*} - converted result, the same what we send over response
 */

export function toError (error, req, res, deps = {log: new MockLogger()}) {
  // TODO: gh-80 actually it should check for UserFacedError and then granular map for HTTP errors
  if (error instanceof ValidationError) {
    res.send({
      status: 0,
      error: error.toJSON()
    })
  } else {
    const log = deps.log

    log.fatal({
      'REQUEST_URL'    : req.url,
      'REQUEST_PARAMS' : req.params,
      'REQUEST_BODY'   : req.body,
      'ERROR_STACK'    : error.stack
    })

    res.send({
      status : 0,
      error  : {
        name    : 'ServerError',
        message : 'Please, contact your system administrator!'
      }
    });
  }

}

