import assert from 'assert'
import express from 'express'
import * as RestApiV1 from './rest-api-v1'
import {makeRunner} from '@zorko-io/util-use-case'

// TODO: gh-80 handle process start/stop, wire with logger, etc
export class WebPortalExpressApp {
  /**
   * @type {Express}
   */

  #http = null
  #config = null

  /**
   * @param {Object} context
   * @param {Object} context.config - app config
   */

  constructor(context = {}) {
    assert(context.config, 'Should have an app config defined')

    this.#config = context.config
    this.#http = express()

    this.initRoutes()
  }

  initRoutes() {
    this.#http.use(
      '/api/v1',
      RestApiV1.route({
        config: this.#config,
        createRouter: () => express.Router(),
        makeRunner
      })
    )
  }

  startAndAttach() {
    this.#http.listen(this.#config.http.port, () => {
      console.log('Server started')
    })
  }
}
