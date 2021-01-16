import {createLogger} from '@zorko-io/util-logger'
import {WebPortalExpressApp} from './lib'
import {config} from './config'

const logger = createLogger({})

const app = new WebPortalExpressApp({
  logger,
  process,
  config,
})

app.startAndAttach()
