import sinon from 'sinon'
import {MockLogger} from '@zorko-io/util-logger'
import {ClientTypes, createClient} from '@zorko-io/util-web-api-client'
import {WebPortalExpressApp} from '../lib'
import {config} from '../config'

/**
 *  setupAppContext initiate WebPortal application, axios client and making process stub for a test environment
 *  and mixin them to the tests context
 *  @param {Object} t - tests context
 *  @return {Promise<undefined>}
 */
export async function setupAppContext(t) {
  const processStub = sinon.stub(process, 'exit')
  const app = new WebPortalExpressApp({config, process, logger: new MockLogger()})
  await app.startAndAttach()
  const client = createClient({
    type: ClientTypes.Axios,
    options: {
      baseURL: `http://localhost:${config.http.port}`,
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
