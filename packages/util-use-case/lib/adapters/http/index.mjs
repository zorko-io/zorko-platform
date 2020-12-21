// TODO: gh-55 move to http adapters, introduce runner adapter concept

export function toUseCaseParams() {
  return {}
}

export function toUseCaseContext() {
  return {}
}

export function mapResultToHttp(result, req, res) {
  res.send(result)
}

export function mapErrorToHttp() {
}
