import assert from 'assert'
import express from 'express'
import {makeRunner} from '@zorko-io/util-use-case'
import {MockLogger} from '@zorko-io/util-logger'
import * as RestApiV1 from './rest-api-v1'

export class WebPortalExpressApp {
  /**
   * @type {Express}
   */

  #app = null

  #http = null

  #config = null

  #process = null

  #logger = null

  /**
   * @param {Object} context
   * @param {Object} context.config - app config
   * @param {Object} context.process - process
   * @param {Object} context.logger - app logger
   */

  constructor(context = {process, logger: new MockLogger()}) {
    const {config, process, logger} = context
    assert(config, 'Should have an app config defined')

    this.#config = config
    this.#logger = logger
    this.#process = process
    this.#http = express()

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

  /**
   * @property {startAndAttach}
   */
  startAndAttach() {
    this.#process.on('SIGTERM', async () => {
      this.#logger.info('SIGTERM signal catched')
      this.stop()
    })

    this.#process.on('SIGINT', async () => {
      this.#logger.info('SIGINT signal catched')
      this.stop()
    })

    this.#process.on('unhandledRejection', (error) => {
      this.#logger.fatal({
        type: 'UnhandledRejection',
        error: error.stack,
      })
    })

    this.#process.on('uncaughtException', (error) => {
      this.#logger.fatal({
        type: 'UncaughtException',
        error: error.stack,
      })
    })

    this.#app = this.#http.listen(this.#config.http.port, () => {
      this.#logger.info('Server started')
    })
  }

  /**
   * @property {stop}
   */
  stop() {
    if (!this.#app) return
    this.#logger.info('Server stopped')
    this.#app.close()
    this.#process.exit(0)
  }
}
