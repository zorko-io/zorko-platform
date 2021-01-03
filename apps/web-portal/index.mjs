import {createLogger} from '@zorko-io/util-logger'
import {WebPortalExpressApp, setLogger} from './lib'
import {config} from './config'

const logger = createLogger({})

setLogger(logger)

const app = new WebPortalExpressApp({
  config,
})

app.startAndAttach()

function appShutdown() {
  app.stop()

  logger.info('Exit')
  process.exit(0)
}

process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal catched')

  appShutdown()
})

process.on('SIGINT', async () => {
  logger.info('SIGINT signal catched')

  appShutdown()
})

process.on('unhandledRejection', (error) => {
  console.error(error)

  logger.fatal({
    type: 'UnhandledRejection',
    error: error.stack,
  })
})

process.on('uncaughtException', (error) => {
  console.error(error)

  logger.fatal({
    type: 'UncaughtException',
    error: error.stack,
  })
})
