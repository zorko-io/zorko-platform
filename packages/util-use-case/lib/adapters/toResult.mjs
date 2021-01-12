export function toResult(result, req, res, deps = {}) {
  result.status = 1

  res.send(result)

  return result
}
