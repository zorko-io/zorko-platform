import assert from 'assert'
import path from 'path'
import express from 'express'
import {makeRunner as makeRunner_} from '@zorko-io/util-use-case'
import {MockLogger} from '@zorko-io/util-logger'
import * as RestApiV1 from './rest-api-v1'
import {corsMiddleware, urlencoded, json, expressPino} from './middlewares'

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

  constructor(
    context = {
      process,
      logger: new MockLogger(),
    }
  ) {
    const {config, process, logger} = context
    assert(config, 'Should have an app config defined')

    this.#config = config
    this.#logger = logger
    this.#process = process
    this.#http = express()

    this.initMiddleware()
  }

  initMiddleware() {
    this.#http.use(expressPino(this.#logger))
    this.#http.use(corsMiddleware)
    this.#http.use(json())
    this.#http.use(urlencoded)

    // TODO: relay on config
    this.#http.use('/', express.static(path.join(path.resolve(), 'public')))
    this.#http.use(
      '/api/v1',
      RestApiV1.route({
        config: this.#config,
        createRouter: () => express.Router(),
        makeRunner: (clazz, options, deps = {}) =>
          makeRunner_(clazz, options, {
            log: this.#logger,
            ...deps,
          }),
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
