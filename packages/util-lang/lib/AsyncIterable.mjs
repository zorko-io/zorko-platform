export class AsyncIterable {
  #it = null

  constructor(iterator) {
    this.#it = iterator
  }

  [Symbol.asyncIterator] = () => {
    return this.#it
  }
}

export function toIterable(iterator) {
  return new AsyncIterable(iterator)
}

export async function toArray(iterable) {
  const result = []

  for await (let val of iterable){
    result.push(val)
  }

  return result
}
