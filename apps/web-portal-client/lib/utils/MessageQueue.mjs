export class MessageQueue {
  #messages = []

  constructor(size) {
    this.size = size
  }

  enqueue(message) {
    this.#messages.push(message)
  }

  dequeue() {
    this.#messages.shift()
  }

  get isEmpty() {
    return !!this.#messages.length
  }

  get queueLength() {
    return this.#messages.length
  }

  push(message) {
    if (!this.isEmpty && this.queueLength >= this.size) {
      this.dequeue()
    }
    this.enqueue(message)
  }

  get messages() {
    return this.#messages
  }
}
