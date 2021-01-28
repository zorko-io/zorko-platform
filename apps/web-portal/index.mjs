import {createLogger, LoggerTypes} from '@zorko-io/util-logger'
import {WebPortalExpressApp} from './lib'
import {config} from './config'

const logger = createLogger({})
const expressLogger = createLogger({type: LoggerTypes.PinoExpress})

const app = new WebPortalExpressApp({
  logger,
  expressLogger,
  process,
  config,
})

;(async () => {
  await app.startAndAttach()
})()
