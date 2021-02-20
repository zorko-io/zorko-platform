import {createLogger} from '@zorko-io/util-logger'
import {MessageQueue} from '../utils'
import {client} from '../api'

const messageQueue = new MessageQueue(10)

export const logger = createLogger({
  context: {
    browser: {
      write: async (message) => {
        messageQueue.push(message)
        if (message.level >= 50) {
          await client.log.save(messageQueue.messages)
        }
      },
    },
  },
})
