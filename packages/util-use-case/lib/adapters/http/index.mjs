// TODO: gh-55 move to http adapters, introduce runner adapter concept

export function toUseCaseParams() {
  return {}
}

export function toUseCaseContext() {
  return {}
}

export function mapResultToHttp(result, req, res) {
  res.send(result)
  return result;
}

export function mapErrorToHttp() {
}


// TODO: gh-55 do proper class and interface, provide todos
//
// class RunnerArgumentsAdapter {
//
//
//   toParams() {
//
//   }
//
//   toContext() {
//
//   }
//
//   toResult() {
//
//   }
//
//   toError() {
//
//   }
//
// }
