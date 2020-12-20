// TODO: gh-55 move to http adapters, introduce runner adapter concept

export function toUseCaseParams(...args) {
  console.log({name: 'toUseCaseParams', args})
  return {}
}

export function toUseCaseContext(...args) {
  console.log({name: 'toUseCaseContext',args})

  return {}
}

export function mapResultToHttp(...args) {
  console.log({name: 'mapResultToHttp',args})

  return {}
}

export function mapErrorToHttp(...args) {
  console.log({name: 'mapErrorToHttp',args})
}
