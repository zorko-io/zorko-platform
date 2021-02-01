import assert from 'assert'
import express from 'express'
import {makeRunner} from '@zorko-io/util-use-case'
import {MockLogger, MockExpressLogger} from '@zorko-io/util-logger'
import * as RestApiV1 from './rest-api-v1'
import {corsMiddleware, urlencoded, json} from './middlewares'

export class WebPortalExpressApp {
  /**
   * @type {Express}
   */

  #app = null

  #http = null

  #config = null

  #process = null

  #logger = null

  #expressLogger = null

  /**
   * @param {Object} context
   * @param {Object} context.config - app config
   * @param {EventEmitter} context.process - web portal application process
   * @param {CoreLogger} context.logger - application logger
   * @param {CoreExpressLogger} context.expressLogger - application http logger
   */

  constructor(context = {process, logger: new MockLogger(), expressLogger: new MockExpressLogger()}) {
    const {config, process, logger, expressLogger} = context
    assert(config, 'Should have an app config defined')

    this.#config = config
    this.#logger = logger
    this.#expressLogger = expressLogger
    this.#process = process
    this.#http = express()

    this.initRoutes()
  }

  initRoutes() {
    this.#http.use(this.#expressLogger.expressPino)
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
   * @return {Promise<undefined>}
   */
  async startAndAttach() {
    this.#process.on('SIGTERM', async () => {
      this.#logger.info('SIGTERM signal catched')
      await this.stop()
    })

    this.#process.on('SIGINT', async () => {
      this.#logger.info('SIGINT signal catched')
      await this.stop()
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
   * @return {Promise<undefined>}
   */
  async stop() {
    if (!this.#app) return
    this.#logger.info('Server stopped')
    this.#app.close()
    this.#process.exit(0)
  }
}
