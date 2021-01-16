export function toResult(result, req, res) {
  result.status = 1

  res.send(result)

  return result
}
