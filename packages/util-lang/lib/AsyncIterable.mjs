export class AsyncIterable {
  #it = null
  #total = null

  constructor(iterator, total) {
    this.#it = iterator
    this.#total = total
  }

  [Symbol.asyncIterator] = () => {
    return this.#it
  }

  get total () {
    return this.#total
  }
}

export function toIterable(iterator, total) {
  return new AsyncIterable(iterator, total)
}

export async function toArray(iterable) {
  const result = []

  for await (let val of iterable){
    result.push(val)
  }

  return result
}
