/**
 * Passes result to response as json,
 * @param result - use case result to convert
 * @param {Express.Request} req - request
 * @param {Express.Response} res - response
 * @param {Object} [deps] - dependencies
 * @return {*} - converted result, the same what we send over response
 */

export function toResult(result, req, res) {
  result.status = 1

  res.send(result)

  return result
}
