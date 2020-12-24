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
  // TODO: gh-80 sends as json
  result.status = 1

  res.send(result)

  return result;
}

export function toError () {

}

