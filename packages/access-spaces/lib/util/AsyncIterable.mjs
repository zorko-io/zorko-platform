export class AsyncIterable {

  #it = null

  constructor(iterable) {

    this.#it = iterable
  }

  [Symbol.asyncIterator] = () => {
    return this.#it
  }
}