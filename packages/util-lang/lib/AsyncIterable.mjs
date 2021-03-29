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
