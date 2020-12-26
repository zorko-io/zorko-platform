import {WebPortalExpressApp} from './lib'
import {config} from './config.mjs'

const app = new WebPortalExpressApp({
  config
})


app.startAndAttach()
