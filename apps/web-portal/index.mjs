import {createLogger} from '@zorko-io/util-logger'
import {WebPortalExpressApp} from './lib'
import {discoverConfig} from './config'

const config = discoverConfig()

const app = new WebPortalExpressApp({
  logger: createLogger({
    ...config.logger
  }),
  process,
  config,
})

;(async () => {
  await app.startAndAttach()
})()
