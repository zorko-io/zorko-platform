import sinon from 'sinon'
import {MockLogger, MockExpressLogger} from '@zorko-io/util-logger'
import {ClientTypes, createClient} from '@zorko-io/util-web-api-client'
import {WebPortalExpressApp} from '../../lib'
import {config} from '../../config'

// TODO: improve port management for integration tests
// label: tech-debt
let {port} = config.http

/**
 *  setupAppContext initiate WebPortal application, axios client and making process stub for a test environment
 *  and mixin them to the tests context
 *  @param {Object} t - tests context
 *  @return {Promise<undefined>}
 */
export async function setupAppContext(t) {
  port += 1
  const processStub = sinon.stub(process, 'exit')
  const app = new WebPortalExpressApp({
    config: {
      http: {
        port,
      },
    },
    process,
    logger: new MockLogger(),
    expressLogger: new MockExpressLogger(),
  })
  await app.startAndAttach()
  const client = createClient({
    type: ClientTypes.Axios,
    options: {
      baseURL: `http://localhost:${port}`,
    },
  })
  t.context = {app, client, processStub}
}

/**
 *  tearDownAppContext stop WebPortal application and restore process stub for a test environment
 *  @param {Object} t - tests context
 *  @return {Promise<undefined>}
 */
export async function tearDownAppContext(t) {
  const {app, processStub} = t.context
  await app.stop()
  processStub.restore()
}
