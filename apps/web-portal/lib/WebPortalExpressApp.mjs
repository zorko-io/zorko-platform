import assert from 'assert'
import express from 'express'
import {appEndpoint} from './appEndpoint.mjs'
import {makePreview} from './preview/makePreview.mjs'

// TODO: gh-55 handle process start/stop, wire with logger, etc
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

    // TODO: gh-55 - re-integrate with endpoints as entity from utils
    this.initEndpoints()
  }

  initEndpoints() {
    appEndpoint(this.#http, '/previews', makePreview)
  }

  startAndAttach () {
     this.#http.listen(this.#config.http.port, () => {
       console.log('Server started')
     })
  }
}
