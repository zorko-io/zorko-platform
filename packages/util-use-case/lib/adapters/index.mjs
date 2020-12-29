import {MockLogger} from '@zorko-io/util-logger'
import {ValidationError} from '@zorko-io/util-error'

// TODO: toResult cover with unit-tests
// - add unit tests
// - extract to separate file
// label: tech-debt
/**
 * Passes result to response as json,
 * @param result - use case result to convert
 * @param {Express.Request} req - request
 * @param {Express.Response} res - response
 * @param {Object} [deps] - dependencies
 * @return {*} - converted result, the same what we send over response
 */
// eslint-disable-next-line no-unused-vars
export function toResult(result, req, res, deps= {}) {
  result.status = 1

  res.send(result)

  return result;
}

// TODO: toError cover with unit-tests
// - add unit tests
// - extract to separate file
// label: tech-debt
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

