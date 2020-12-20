import assert from 'assert'
import express from 'express'

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

    this.initUseCases()
  }

  initUseCases() {
    const router = express.Router()

    router.get('/', (req, res) => {
       res.send('boom')
    })

    this.#http.use('/previews', router)
  }

  startAndAttach () {
     this.#http.listen(this.#config.http.port, () => {
       console.log('Server started')
     })
  }
}
