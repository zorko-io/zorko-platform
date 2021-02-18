import {createLogger} from '@zorko-io/util-logger'
import {client} from '../api'

class MessageQue {
  constructor(size) {
    this.logs = []
    this.size = size
  }

  enqueue(message) {
    this.logs.push(message)
  }

  dequeue() {
    this.logs.shift()
  }

  push(message) {
    if (this.logs.length >= this.size && this.logs.length) {
      this.dequeue()
    }
    this.enqueue(message)
  }

  get messages() {
    return this.logs
  }
}

const messageQue = new MessageQue(10)

export const logger = createLogger({
  config: {
    browser: {
      write: async (message) => {
        messageQue.push(message)

        if (message.level >= 50) {
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@')
          console.log(messageQue.messages)
          await client.log.send(messageQue.messages)
        }
      },
    },
  },
})
