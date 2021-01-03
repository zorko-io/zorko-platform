import assert from 'assert'
import express from 'express'
import {makeRunner} from '@zorko-io/util-use-case'
import logger from './logger'
import * as RestApiV1 from './rest-api-v1'

export class WebPortalExpressApp {
  /**
   * @type {Express}
   */

  #app = null

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
    this.#app = express()

    this.initRoutes()
  }

  initRoutes() {
    // TODO Add Middlewares
    //  add 'standard' middlewares
    //  labels: enhancement
    this.#http.use(
      '/api/v1',
      RestApiV1.route({
        config: this.#config,
        createRouter: () => express.Router(),
        makeRunner,
      })
    )
  }

  startAndAttach() {
    this.#app = this.#http.listen(this.#config.http.port, () => {
      logger.info('Server started')
    })
  }

  stop() {
    if (!this.#app) return
    logger.info('Server stopped')
    this.#app.close()
  }
}
