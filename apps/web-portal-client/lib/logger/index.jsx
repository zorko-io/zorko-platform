import {createLogger} from '@zorko-io/util-logger'
import {MessageQueue} from '../utils'
import {client} from '../api'

const LOGS_MAX_SIZE = 10
const messageQueue = new MessageQueue(LOGS_MAX_SIZE)

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
