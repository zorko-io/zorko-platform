import assert from 'assert'
import express from 'express'
import {makeRunner} from '@zorko-io/util-use-case'
import {MockLogger} from '@zorko-io/util-logger'
import * as RestApiV1 from './rest-api-v1'
import {corsMiddleware, urlencoded, json} from './middlewares'


// TODO: Test Task Creation

// TODO: Another Test Task Creation

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
   * @param {EventEmitter} context.process - web portal application process
   * @param {CoreLogger} context.logger - application logger
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
    this.#http.use(corsMiddleware)
    this.#http.use(json())
    this.#http.use(urlencoded)

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
   * @method Starts all necessary application's component and attach it's execution to current process
   * @return {undefined}
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
   * @method Stop execution of the current process
   * @return {undefined}
   */
  stop() {
    if (!this.#app) return
    this.#logger.info('Server stopped')
    this.#app.close()
    this.#process.exit(0)
  }
}
